import pool from '../../db/db.js'
import util from '../../utils/util.js'
import validator from '../../validator/settings.js'
import { addSetting, getSetting, updateSetting, getAllSettings } from '../../db/firebase/setting.js'

const addSettingController = async (req, res) => {
    try {
        const { name, value } = req.body
        const validate = await validator.addSettingValidator({ name, value }, res)

        if (validate && validate.statusCode === 400) return
        const setting = await getSetting(name)
        if (setting) {
            return util.serverResponse(res, 400, false, { message: 'Setting already exists' })
        }

        await addSetting({ name, value, dateAdded: new Date() })

        return util.serverResponse(res, 201, true, {
            message: 'Setting added successfully',
            data: { name, value, dateAdded: new Date() },
        })
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const getSettingsController = async (req, res) => {
    try {
        const settings = await getAllSettings()
        util.serverResponse(res, 200, true, settings)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const getSettingController = async (req, res) => {
    try {
        const { name } = req.params
        console.log('the name', name)
        const setting = await getSetting(name)
        if (!setting) return util.serverResponse(res, 404, false, { message: 'Setting not found' })

        return util.serverResponse(res, 200, true, setting)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const updateSettingController = async (req, res) => {
    try {
        const { name } = req.params
        const { value } = req.body
        const validate = await validator.addSettingValidator({ name, value }, res)

        if (validate && validate.statusCode === 400) return
        const setting = await getSetting(name)
        if (!setting) return util.serverResponse(res, 404, false, { message: 'Setting not found' })

        await updateSetting(name, value)

        return util.serverResponse(res, 201, true, {
            message: 'Setting updated successfully',
            data: { name, value },
        })
    } catch (error) {
        console.log('the error', error)
        util.serverResponse(res, 500, false, error)
    }
}

export default { addSettingController, getSettingController, getSettingsController, updateSettingController }