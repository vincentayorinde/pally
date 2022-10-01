import util from '../../utils/util.js'
import priceService from '../../services/price/index.js'
import datataService from '../../services/datata/index.js'

const sendToSlack = async (req, res) => {
    try {
        const priceInfo = await priceService.getBtcUsdtPrice();
        console.log('the price info', priceInfo);
    
        if(priceInfo.percentageChange !== 0) {
            datataService.sendToSlack('price_update', `Current BTC/USDT Price: ${priceInfo.marketPrice} (${priceInfo.percentageChange > 0 ? '+':''}${priceInfo.percentageChange}%)`, res)
        }
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

export default { sendToSlack }