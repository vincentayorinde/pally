import jwt from 'jsonwebtoken'
import util from '../../utils/util.js'
import pool from "../../db/db.js";
import queries from "../../db/queries/users.js";



const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 0)
            return util.serverResponse(
                res,
                400,
                false,
                'Account does not exist'
            )
        // Check password
        const validPassword = util.compareHash(
            password,
            users.rows[0].user_password
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
        return util.serverResponse(res, 200, true, tokens)
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
                    return util.serverResponse(res, 403, false, { message: 'Forbidden', error: error.message })
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
        return util.serverResponse(res, 200, true,  { message: 'refresh token cleared' })
    } catch (error) {
        util.serverResponse(res, 401, false, error)
    }
}

export default { login, refreshToken, logout }
