import express from 'express'
import authController from '../controllers/auth/auth.js'

const router = express.Router()

router.post('/login', authController.login)
router.post('/verify', authController.verify)
router.get('/refresh_token', authController.refreshToken)
router.get('/logout', authController.logout)
router.post('/forget', authController.forget)
router.post('/reset', authController.reset)

export default router
