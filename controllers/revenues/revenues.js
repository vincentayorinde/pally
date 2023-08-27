import util from '../../utils/util.js'
import { getRevenue, getAllRevenues } from '../../db/firebase/revenue.js'

const getAllRevenuesController = async (req, res) => {
    try {
        const revenues = await getAllRevenues()
        util.serverResponse(res, 200, true, revenues)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const getRevenueController = async (req, res) => {
    try {
        const { revenueId } = req.params
        console.log('the revenue', revenueId)
        const revenue = await getRevenue(revenueId)
        if (!revenue) return util.serverResponse(res, 404, false, { message: 'Revenue not found' })

        return util.serverResponse(res, 200, true, revenue)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}


export default { getRevenueController, getAllRevenuesController }