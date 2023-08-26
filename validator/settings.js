import Joi from 'joi'
import util from '../utils/util.js'

const addSettingSchema = Joi.object({
    name: Joi.string().required(),
    value: Joi.any().required()
})

const addSettingValidator = async ({ name, value }, res) => {
    try {
        await addSettingSchema.validateAsync({
            name,
            value
        })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

export default { addSettingSchema, addSettingValidator }
