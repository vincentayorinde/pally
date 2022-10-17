import * as dotenv from 'dotenv'
import ccxt from 'ccxt'
import axios from 'axios'
import Price from '../price/index.js'

dotenv.config()

const buyOrder = async (config, binanceClient) => {
    const {
        asset,
        base,
        buyAllocation,
        buySpread,
    } = config
    const market = `${asset}/${base}`

    const orders = await binanceClient.fetchOpenOrders(market)

    if (orders.length > 0) {
        console.log('the orders to cancel  >>>>>', orders)
        orders.forEach(async (order) => {
            await binanceClient.cancelOrder(order.id, market)
        })
    }
   

    const priceData = await Price.getBtcUsdtPrice()
    console.log('the price data ', priceData);
    const marketPrice = priceData.marketPrice

    console.log('the market price', Number(parseFloat(marketPrice).toFixed(2)))
    console.log('the buy spread >>>', 1 - buySpread, buySpread)

    const buyPrice = Number(parseFloat(marketPrice * (1 - buySpread)).toFixed(2))

    const balances = await binanceClient.fetchBalance()

    const binanceAskPrice = await binanceClient.fetchTicker(market)

    // get closed bid price
    console.log('the ask price >>>>', binanceAskPrice)


    console.log('your binance balances', balances[asset])
    console.log('your binance base', balances[base])

    const assetBalance = balances[asset].free
    const baseBalance = balances[base].free

    const buyVolume = Number(
        parseFloat((baseBalance * buyAllocation) / marketPrice).toFixed(8)
    )

    console.log('create limit buy order info >>>>', market, buyVolume, marketPrice, buyPrice)
    // const buyLimitRes = await binanceClient.createLimitBuyOrder(market, buyVolume, marketPrice)

    // console.log('the res for buyLimitRes >>>>', buyLimitRes);

    console.log(`
    New tick for ${market}...
   
    Created limit buy order for ${buyVolume}@${marketPrice}
    `)
}


const run = () => {
    const config = {
        asset: 'BTC',
        base: 'USDT',
        buyAllocation: 0.5,
        buySpread: 0.009,
        tickInterval: 2000,
    }

    const binanceClient = new ccxt.binance({
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_SECRET_KEY,
    })
    buyOrder(config, binanceClient)
    // setInterval(tick, config.tickInterval, config, binanceClient)
}

run()