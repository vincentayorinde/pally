import * as dotenv from 'dotenv'
// import ccxt from 'ccxt'
import axios from 'axios'
import Price from '../price/index.js'

dotenv.config()

const sellOrder = async (config, binanceClient) => {
    const {
        asset,
        base,
        sellAllocation,
        sellSpread,
        buyAllocation,
        buySpread,
    } = config
    const market = `${asset}/${base}`

    const orders = await binanceClient.fetchOpenOrders(market)

    if (orders.length > 0) {
        console.log('the orders to cancel  >>>>>', orders)
        // orders.forEach(async (order) => {
        //     await binanceClient.cancelOrder(order.id, market)
        // })
    }
   

    const priceData = await Price.getBtcUsdtPrice()
    console.log('the price data ', priceData);
    const marketPrice = priceData.marketPrice

    console.log('the market price', Number(parseFloat(marketPrice).toFixed(2)))
    console.log('the sell spread >>>', 1 + sellSpread, sellSpread)
    console.log('the buy spread >>>', 1 - buySpread, buySpread)

    // const sellPrice = Number(parseFloat(marketPrice * (1 + sellSpread)).toFixed(2))
    // const buyPrice = Number(parseFloat(marketPrice * (1 - buySpread)).toFixed(2))

    const balances = await binanceClient.fetchBalance()

    console.log('your binance balances', balances[asset])
    console.log('your binance base', balances[base])

    const assetBalance = balances[asset].free
    const baseBalance = balances[base].free

    const sellVolume = Number(parseFloat(assetBalance * sellAllocation).toFixed(8))
    const buyVolume = Number(
        parseFloat((baseBalance * buyAllocation) / marketPrice).toFixed(8)
    )

    console.log('create limit sell order info >>>>', market, sellVolume, marketPrice)

    const sellLimitRes = await binanceClient.createLimitSellOrder(market, sellVolume, sellPrice)

    console.log('the res for sellLimitRes >>>>', sellLimitRes);

    console.log(`
    New tick for ${market}...
   
    Created limit sell order for ${sellVolume}@${marketPrice}
    `)
}


const run = () => {
    const config = {
        asset: 'BTC',
        base: 'USDT',
        sellAllocation: 0.5,
        sellSpread: 0.009,
        buyAllocation: 0.5,
        buySpread: 0.009,
        tickInterval: 2000,
    }

    // const binanceClient = new ccxt.binance({
    //     apiKey: process.env.BINANCE_API_KEY,
    //     secret: process.env.BINANCE_SECRET_KEY,
    // })
    // sellOrder(config, binanceClient)
}

run()