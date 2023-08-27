import * as dotenv from 'dotenv'
// import ccxt from 'ccxt'
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
        orders.forEach(async (order) => {
            await binanceClient.cancelOrder(order.id, market)
        })
    }
   

    const priceData = await Price.getBtcUsdtPrice()
    const marketPrice = priceData.marketPrice

    const buyPrice = Number(parseFloat(marketPrice * (1 - buySpread)).toFixed(2))

    const balances = await binanceClient.fetchBalance()

    const binanceAskPrice = await binanceClient.fetchTicker(market)

    // get closed bid price

    const assetBalance = balances[asset].free
    const baseBalance = balances[base].free

    const buyVolume = Number(
        parseFloat((baseBalance * buyAllocation) / marketPrice).toFixed(8)
    )

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

    // const binanceClient = new ccxt.binance({
    //     apiKey: process.env.BINANCE_API_KEY,
    //     secret: process.env.BINANCE_SECRET_KEY,
    // })
    // buyOrder(config, binanceClient)
    // setInterval(tick, config.tickInterval, config, binanceClient)
}

run()