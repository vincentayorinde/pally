import dotenv from 'dotenv'
import util from '../../utils/util.js'
import priceService from '../../services/price/index.js'

dotenv.config()

export const handleBTCJob = async () => {
        const priceInfo = await priceService.getBtcUsdtPrice()
        const positiveNegative = priceInfo.percentageChange > 0 ? '+' : ''

        console.log('the price info', priceInfo)
        const message = `Current BTC/USDT: ${priceInfo.marketPrice} (${
            positiveNegative + priceInfo.percentageChange
        }%)[$${positiveNegative + priceInfo.difference}]`

        if (priceInfo.percentageChange !== 0) {
            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/slack`,
                {
                    channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                    channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                    message,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/discord`,
                {
                    webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                    message,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )
        }
}
export const handleETHJob = async () => {

        const priceInfo = await priceService.getEthUsdtPrice()
        const positiveNegative = priceInfo.percentageChange > 0 ? '+' : ''

        console.log('the price info', priceInfo)
        const message = `Current ETH/USDT: ${priceInfo.marketPrice} (${
            positiveNegative + priceInfo.percentageChange
        }%)[$${positiveNegative + priceInfo.difference}]`

        if (priceInfo.percentageChange !== 0) {
            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/slack`,
                {
                    channel_name: process.env.PALLY_NOTIFICATION_CHANNEL,
                    channel_id: process.env.PALLY_NOTIFICATION_CHANNEL_ID,
                    message,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )

            await util.serverRequest(
                'post',
                `${process.env.ALERTA_URL}/discord`,
                {
                    webhook: process.env.PALLY_DISCORD_CHANNEL_WEBHOOK,
                    message,
                },
                { secretKey: `secret ${process.env.KEY}` }
            )
        }
}
