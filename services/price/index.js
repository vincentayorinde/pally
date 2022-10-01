import * as dotenv from 'dotenv'
import util from '../../utils/util.js'
import fs from 'fs'


dotenv.config()

const getBtcUsdtPrice = async () => {
    const results = await Promise.all([
        util.serverRequest('get',`${process.env.PRICE_API}?ids=bitcoin&vs_currencies=usd`),
        util.serverRequest('get',`${process.env.PRICE_API}?ids=tether&vs_currencies=usd`),
    ])

    console.log('the prices result >>>', results[0].data, results[1].data)

    const marketPrice = util.numberTo2DecimalPlaces(results[0].data.bitcoin.usd / results[1].data.tether.usd)

    console.log('the market price >>>>', marketPrice);

    // store price in csv
    const lastMarketPrice = fs.readFileSync("./db/price.csv", "utf8");
    fs.writeFileSync("./db/price.csv", marketPrice.toString(), "utf8");

    const percentageChange = util.numberTo2DecimalPlaces((marketPrice - Number(lastMarketPrice)) / 100)
    return {marketPrice, percentageChange}
}


export default { getBtcUsdtPrice }