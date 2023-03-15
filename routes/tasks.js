import express from 'express'
import taskController from '../controllers/tasks/task.js'

const router = express.Router()

router.post('/', taskController.sendToSlack)

export default router
