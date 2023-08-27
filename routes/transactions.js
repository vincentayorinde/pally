import express from 'express'
import transactions from '../controllers/transactions/transactions.js'

const router = express.Router()

router.get('/', transactions.getTransactionsController)
router.get('/:transactionId', transactions.getTransactionController)

export default router