import dotenv from 'dotenv'
import util from '../../utils/util.js'
import priceService from '../../services/price/index.js'
import { getAllSettings, updateSetting } from '../../db/firebase/setting.js'
import custom from '../../services/custom/custom.js'
dotenv.config()

const settings = await getAllSettings();
let actualSettings = {}

for (const setting of settings) {
    if (setting.name && setting.value) {
        actualSettings[setting.name] = setting.value;
    }
}

console.log('the actualSettings <<< >>>>', actualSettings)

export const handleBTCJob = async () => {
    const { buyMargin, sellMargin, amountUSD, amountBTC, fees, btcPrice, storage } = actualSettings;

    try {

        const priceInfo = await priceService.getBtcUsdtPrice(btcPrice)
        const positiveNegative_ = priceInfo.percentageChange > 0 ? '+' : ''
        const positiveNegative = priceInfo.percentageChange > 0 ? '🟢 +' : '🔴 '

        console.log('the price info', priceInfo)
        const message = `Current BTC/USDT: ${priceInfo.marketPrice} (${positiveNegative + priceInfo.percentageChange
            }%)[$${positiveNegative_ + priceInfo.difference}]`

        if (priceInfo.percentageChange !== 0) {
            let buyMessage;
            buyMessage = await custom.makeBTCBuyOrder(amountUSD, amountBTC, buyMargin, sellMargin, priceInfo.marketPrice, priceInfo.percentageChange, fees)
            console.log('>>>> the BTC buy message >>>>', buyMessage)

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/slack`,
                {
                    channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                    channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                    message: `${message} -- Buy/Sell Message: ${buyMessage}`,

                },
                { secretKey: `secret ${process.env.KEY}` }
            )

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/discord`,
                {
                    webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                    message: `${message} -- Buy/Sell Message: ${buyMessage}`,

                },
                { secretKey: `secret ${process.env.KEY}` }
            )


        }
    } catch (error) {
        console.log('error in the catch block')
        console.log('the error message >>', error.message)
        await util.serverRequest(
            'post',
            `${process.env.ALERTA_URL}/slack`,
            {
                channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                message: `Thers is an Error: ${error.message}`,

            },
            { secretKey: `secret ${process.env.KEY}` }
        )

        await util.serverRequest(
            'post',
            `${process.env.ALERTA_URL}/discord`,
            {
                webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                message: `Thers is an Error: ${error.message}`,

            },
            { secretKey: `secret ${process.env.KEY}` }
        )
        console.log('the error itself >>', error)
    }
}

export const handleETHJob = async () => {
    const { buyMargin, sellMargin, amountUSD, amountETH, fees, ethPrice } = actualSettings;

    try {
        const priceInfo = await priceService.getEthUsdtPrice(ethPrice)
        const positiveNegative_ = priceInfo.percentageChange > 0 ? '+' : ''
        const positiveNegative = priceInfo.percentageChange > 0 ? '🟢 +' : '🔴 '

        console.log('the price info', priceInfo)
        const message = `Current ETH/USDT: ${priceInfo.marketPrice} (${positiveNegative + priceInfo.percentageChange
            }%)[$${positiveNegative_ + priceInfo.difference}]`

        if (priceInfo.percentageChange !== 0) {
            let buyMessage;

            buyMessage = await custom.makeETHBuyOrder(amountUSD, amountETH, buyMargin, sellMargin, priceInfo.marketPrice, priceInfo.percentageChange, fees)
            console.log('>>>> the ETH buy message >>>>', buyMessage)

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/slack`,
                {
                    channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                    channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                    message: `${message} -- Buy/Sell Message: ${buyMessage}`,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/discord`,
                {
                    webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                    message: `${message} -- Buy/Sell Message:  ${buyMessage}`,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )

                    await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/discord`,
                {
                    webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                    message: `${message} -- Buy/Sell Message: ${buyMessage}`,

                },
                { secretKey: `secret ${process.env.KEY}` }
            )

        }

    } catch (error) {
        console.log('error in the catch block')
        console.log('the error message >>', error.message)
        await util.serverRequest(
            'post',
            `${process.env.ALERTA_URL}/slack`,
            {
                channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                message: `Thers is an Error: ${error.message}`,

            },
            { secretKey: `secret ${process.env.KEY}` }
        )

        await util.serverRequest(
            'post',
            `${process.env.ALERTA_URL}/discord`,
            {
                webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                message: `Thers is an Error: ${error.message}`,

            },
            { secretKey: `secret ${process.env.KEY}` }
        )
        console.log('the error itself >>', error)
    }

}
