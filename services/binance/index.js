import * as dotenv from 'dotenv'
import ccxt from 'ccxt'
import axios from 'axios'



dotenv.config()



const tick = async (config, binanceClient) => {
    const { asset, base, allocation, spread } = config
    const market =  `${asset}/${base}`

    const orders = await binanceClient.fetchOpenOrders(market);
    orders.forEach(async order => {
        await binanceClient.cancelOrder(order.id)
    });

    const results = await Promise.all([
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
        'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'
    ])

    const marketPrice = results[0].data.binance.usd / results[1].data.tether.usd

    const sellPrice = marketPrice * (1 + spread)
    const buyPrice = marketPrice * (1 - spread)

    const balances = await binanceClient.fetchBalance()

    const assetBalance = balances.free(balances[asset])
    const baseBalance = balances.free(balances[base])

    const sellVolume = assetBalance * allocation
    const buyVolume = (baseBalance * allocation) / marketPrice

    await binanceClient.createLimitSellOrder(market, sellVolume, sellPrice)
    await binanceClient.createLimitBuyOrder(market,  buyVolume, buyPrice)

    console.log(`
    New tick for ${market}...
    Created limit sell order for ${sellVolume}@${sellPrice}
    Created limit buy order for ${buyVolume}@${buyPrice}
    `)
}

const run = () => {
    const config = {
        asset: 'BTC',
        base: 'USDT',
        allocation: 0.1,
        spread: 0.2,
        tickInterval: 2000
    }

    const binanceClient = new ccxt.binance({
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_SECRET_KEY,
    })
    tick(config, binanceClient)
    setInterval(tick, config.tickInterval, config, binanceClient)
}

run()