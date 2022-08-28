import jwt from 'jsonwebtoken'
import logger from 'pino'
import util from '../../utils/util.js'
import pool from '../../db/db.js'
import queries from '../../db/queries/users.js'
import validator from '../../validator/users.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const validate = await validator.emailValidator({ email }, res)
        if (validate && validate.statusCode === 400) return

        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 0)
            return util.serverResponse(
                res,
                400,
                false,
                'Account does not exist'
            )
        // Check password
        const validPassword = await util.compareHash(
            password,
            users.rows[0].password
        )
        if (!validPassword)
            return util.serverResponse(res, 400, false, 'Incorrect credentials')

        //  Send back JWT
        let tokens = util.jwtTokens(users.rows[0])

        res.cookie('refresh_token', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
        })
        const user = {
            firstName: users.rows[0].firstname,
            lastName: users.rows[0].lastname,
            email: users.rows[0].email,
            isActive: users.rows[0].isactive,
            emailVerified: users.rows[0].emailverified,
        }
        await pool.query(queries.setRefreshToken, [tokens.refreshToken, email])

        return util.serverResponse(res, 200, true, { tokens, user })
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const verify = async (req, res) => {
    try {
        const { email, otp } = req.body
        const validate = await validator.verifyUserValidator(
            { otp, email },
            res
        )
        if (validate && validate.statusCode === 400) return

        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 0)
            return util.serverResponse(
                res,
                400,
                false,
                'Account does not exist'
            )
        // Check otp
        if (users.rows[0].otp !== otp)
            return util.serverResponse(res, 400, false, 'Invalid OTP')

        //  remove otp and verify and activate account
        await pool.query(queries.verifyAndActive, [otp, email])
        logger().info(`user with email ${email} verified successfully`)
        return util.serverResponse(
            res,
            200,
            true,
            'Account verification successful'
        )
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token
        if (refreshToken === null)
            util.serverResponse(res, 400, false, {
                message: 'Null refresh token',
            })
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (error, user) => {
                if (error)
                    return util.serverResponse(res, 403, false, {
                        message: 'Forbidden',
                        error: error.message,
                    })
                let tokens = util.jwtTokens(user)
                res.cookie('refresh_token', tokens.refreshToken, {
                    httpOnly: true,
                    sameSite: 'lax',
                    secure: true,
                })
                util.serverResponse(res, 200, true, { tokens })
            }
        )
    } catch (error) {
        util.serverResponse(res, 500, false, { error })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return util.serverResponse(res, 200, true, {
            message: 'refresh token cleared',
        })
    } catch (error) {
        util.serverResponse(res, 401, false, error)
    }
}

const forget = async (req, res) => {
    try {
        const { email } = req.body
        const validate = await validator.emailValidator({ email }, res)

        if (validate && validate.statusCode === 400) return

        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 0)
            return util.serverResponse(
                res,
                400,
                false,
                'Account does not exist'
            )

        // set otp
        const otp = util.generateCode(6)

        await pool.query(queries.setOTP, [otp, email])
        logger().info(`Reset code sent to ${email} successfully`)
        return util.serverResponse(
            res,
            200,
            true,
            'Reset code sent successfully'
        )
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const reset = async (req, res) => {
    try {
        const { email, otp, password, confirm_password } = req.body
        const validate = await validator.resetValidator(
            { otp, email, password, confirm_password },
            res
        )
        if (validate && validate.statusCode === 400) return

        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 0)
            return util.serverResponse(
                res,
                400,
                false,
                'Account does not exist'
            )
        // Check otp
        if (users.rows[0].otp !== otp)
            return util.serverResponse(res, 400, false, 'Invalid OTP')

        const hashPassword = await util.hashData(password, 10)

        //  remove otp and set new password
        await pool.query(queries.resetPassword, [hashPassword, email])
        logger().info(`user with email ${email} password reset successful`)
        return util.serverResponse(
            res,
            200,
            true,
            'Account password reset successful'
        )
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

export default { login, refreshToken, logout, verify, forget, reset }
