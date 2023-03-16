import util from '../../utils/util.js'
import { handleBTCJob, handleETHJob } from '../../tasks/price/index.js'
const sendToSlack = async (req, res) => {
    try {
        const { channel, message } = req.body
        datataService.sendToSlack(channel, message, res)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const runBTCJob = async (req, res) => {
    try {
        handleBTCJob()
        util.serverResponse(res, 200, true, { message: 'BTC job ran successfully' })
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const runETHJob = async (req, res) => {
    try {
        handleETHJob()
        util.serverResponse(res, 200, true, { message: 'ETH job ran successfully' })
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

export default { sendToSlack, runBTCJob, runETHJob }
