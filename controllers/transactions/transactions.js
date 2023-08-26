import util from '../../utils/util.js'
import { getTransaction, getAllTransactions } from '../../db/firebase/transaction.js'

const getTransactionsController = async (req, res) => {
    try {
        const transactions = await getAllTransactions()
        util.serverResponse(res, 200, true, transactions)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const getTransactionController = async (req, res) => {
    try {
        const { transactionId } = req.params
        console.log('the name', transactionId)
        const transaction = await getTransaction(transactionId)
        if (!transaction) return util.serverResponse(res, 404, false, { message: 'Transaction not found' })

        return util.serverResponse(res, 200, true, transaction)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}


export default { getTransactionController, getTransactionsController }