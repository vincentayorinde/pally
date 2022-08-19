import Joi from 'joi'
import util from './util.js'
const createUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({ 'any.only': '{{#label}} does not match' })
})

const createUserValidator = async ({ firstName, lastName, email, password, confirm_password }, res) => {
    try {
        await createUserSchema.validateAsync({ firstName, lastName, email, password, confirm_password })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

export default { createUserValidator }
