import util from '../../utils/util.js'

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const users = await pool.query(queries.getUser, [email])
        if (users.rows.length === 0)
            return util.serverResponse(res, 400, false, 'Account does not exist')
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

export default { login };
