import * as dotenv from 'dotenv'
import util from '../../utils/util.js'
import fs from 'fs'
import { add, read, update } from '../../utils/firebase.js'

dotenv.config()

const getBtcUsdtPrice = async () => {
    const results = await Promise.all([
        util.serverRequest(
            'get',
            `${process.env.PRICE_API}?ids=bitcoin&vs_currencies=usd`
        ),
        util.serverRequest(
            'get',
            `${process.env.PRICE_API}?ids=tether&vs_currencies=usd`
        ),
    ])

    console.log('the prices result >>>', results[0].data, results[1].data)

    const marketPrice = util.numberTo2DecimalPlaces(
        results[0].data.bitcoin.usd / results[1].data.tether.usd
    )

    console.log('the market price >>>>', marketPrice)

    // store price in csv
    let lastMarketPrice = await read('btc')
    lastMarketPrice = lastMarketPrice.price
    console.log('the lastMarketPrice', lastMarketPrice)
    // const lastMarketPrice = fs.readFileSync("./db/prices/btc_price.csv", "utf8");
    if (!lastMarketPrice) {
        await add({ price: marketPrice, type: 'btc' })
    } else {
        console.log('>>>> updating')
        await update('btc', marketPrice)
    }
    // fs.writeFileSync("./db/prices/btc_price.csv", marketPrice.toString(), "utf8");

    const difference = util.numberTo2DecimalPlaces(
        marketPrice - Number(lastMarketPrice)
    )

    const percentageChange = util.numberTo2DecimalPlaces(
        (marketPrice - Number(lastMarketPrice)) / 100
    )
    return { marketPrice, percentageChange, difference }
}

const getEthUsdtPrice = async () => {
    const results = await Promise.all([
        util.serverRequest(
            'get',
            `${process.env.PRICE_API}?ids=ethereum&vs_currencies=usd`
        ),
        util.serverRequest(
            'get',
            `${process.env.PRICE_API}?ids=tether&vs_currencies=usd`
        ),
    ])

    console.log('the ETH prices result >>>', results[0].data, results[1].data)

    const marketPrice = util.numberTo2DecimalPlaces(
        results[0].data.ethereum.usd / results[1].data.tether.usd
    )

    console.log('the ETH market price >>>>', marketPrice)

    // store price in csv
    // const lastMarketPrice = fs.readFileSync("./db/prices/eth_price.csv", "utf8");
    // fs.writeFileSync("./db/prices/eth_price.csv", marketPrice.toString(), "utf8");
    // store price in csv
    let lastMarketPrice = await read('eth')
    lastMarketPrice = lastMarketPrice.price
    console.log('the lastMarketPrice', lastMarketPrice)
    // const lastMarketPrice = fs.readFileSync("./db/prices/btc_price.csv", "utf8");
    if (!lastMarketPrice) {
        await add({ price: marketPrice, type: 'eth' })
    } else {
        await update('eth', marketPrice)
    }
    // fs.writeFileSync("./db/prices/btc_price.csv", marketPrice.toString(), "utf8");

    const difference = util.numberTo2DecimalPlaces(
        marketPrice - Number(lastMarketPrice)
    )

    const percentageChange = util.numberTo2DecimalPlaces(
        (marketPrice - Number(lastMarketPrice)) / 100
    )
    return { marketPrice, percentageChange, difference }
}

export default { getBtcUsdtPrice, getEthUsdtPrice }
