import express from 'express'
import taskController from '../controllers/tasks/task.js'

const router = express.Router()

router.post('/', taskController.sendToSlack)
router.post('/runBTC', taskController.runBTCJob)
router.post('/runETH', taskController.runETHJob)

export default router
