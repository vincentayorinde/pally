import util from '../../utils/util.js'
import datataService from '../../services/datata/index.js'

const sendToSlack = async (req, res) => {
    try {
        const { channel, message } = req.body
        datataService.sendToSlack(channel, message, res)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

export default { sendToSlack }
