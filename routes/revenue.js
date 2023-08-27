import express from 'express'
import revenues from '../controllers/revenues/revenues.js'

const router = express.Router()

router.get('/', revenues.getAllRevenuesController)
router.get('/:revenueId', revenues.getRevenueController)

export default router