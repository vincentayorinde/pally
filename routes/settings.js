import express from 'express'
import settings from '../controllers/settings/settings.js'

const router = express.Router()

router.get('/', settings.getSettingsController)
router.put('/:name', settings.updateSettingController)
router.get('/:name', settings.getSettingController)
router.post('/', settings.addSettingController)

export default router