import express from 'express'
import taskController from '../controllers/tasks/task.js'

const router = express.Router()

router.get('/', taskController.sendToSlack)
router.get('/runBTC', taskController.runBTCJob)
router.get('/runETH', taskController.runETHJob)

export default router
