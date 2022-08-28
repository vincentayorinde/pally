import express from 'express'
import { authenticateToken } from '../middleware/auth.js'
import userController from '../controllers/users/users.js'

const router = express.Router()

router.get('/', authenticateToken, userController.getUsers)
router.post('/activate/:activate', authenticateToken, userController.activateOrDeactivate)
router.post('/', userController.createUser)

export default router
