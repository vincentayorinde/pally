import Joi from 'joi'
import util from '../utils/util.js'

const createUserSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirm_password: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
})

const createUserValidator = async (
    { firstName, lastName, email, password, confirm_password },
    res
) => {
    try {
        await createUserSchema.validateAsync({
            firstName,
            lastName,
            email,
            password,
            confirm_password,
        })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

const verifyUserSchema = Joi.object({
    otp: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
})

const verifyUserValidator = async ({ otp, email }, res) => {
    try {
        await verifyUserSchema.validateAsync({ otp, email })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

const emailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
})

const emailValidator = async ({ email }, res) => {
    try {
        await emailSchema.validateAsync({ email })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

const resetSchema = Joi.object({
    otp: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).message({"string.pattern.base":"Please type a stronger valid password"})
        .required(),
    confirm_password: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} does not match' }),
})

const resetValidator = async (
    { otp, email, password, confirm_password },
    res
) => {
    try {
        await resetSchema.validateAsync({
            otp,
            email,
            password,
            confirm_password,
        })
    } catch (error) {
        const message = error.details[0].message
        return util.serverResponse(res, 400, false, message)
    }
}

export default { createUserValidator, verifyUserValidator, emailValidator, resetValidator }
