import * as dotenv from 'dotenv'
import util from '../../utils/util.js'
import fs from 'fs'
import { addSetting, updateSetting, getSetting } from '../../db/firebase/setting.js'

dotenv.config()

const getBtcUsdtPrice = async (lastMarketPrice) => {
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

    const marketPrice = util.numberTo2DecimalPlaces(
        results[0].data.bitcoin.usd / results[1].data.tether.usd
    )

    if (!lastMarketPrice) {
        await addSetting({ name: 'btcPrice', value: marketPrice, dateAdded: new Date() })
    } else {
        await updateSetting('btcPrice', marketPrice)
    }
    const difference = util.numberTo2DecimalPlaces(
        marketPrice - Number(lastMarketPrice)
    )

    const percentageChange = util.numberTo2DecimalPlaces(
        (marketPrice - Number(lastMarketPrice)) / 100
    )
    return { marketPrice, percentageChange, difference, lastMarketPrice }
}

const getEthUsdtPrice = async (lastMarketPrice) => {
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


    const marketPrice = util.numberTo2DecimalPlaces(
        results[0].data.ethereum.usd / results[1].data.tether.usd
    )
    
    if (!lastMarketPrice) {
        await addSetting({ name: 'ethPrice', value: marketPrice, dateAdded: new Date() })
    } else {
        await updateSetting('ethPrice', marketPrice)
    }
    

    const difference = util.numberTo2DecimalPlaces(
        marketPrice - Number(lastMarketPrice)
    )

    const percentageChange = util.numberTo2DecimalPlaces(
        (marketPrice - Number(lastMarketPrice)) / 100
    )
    return { marketPrice, percentageChange, difference }
}

export default { getBtcUsdtPrice, getEthUsdtPrice }
