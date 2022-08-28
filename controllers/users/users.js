import pool from '../../db/db.js'
import util from '../../utils/util.js'
import validator from '../../validator/users.js'
import queries from '../../db/queries/users.js'

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirm_password } =
            req.body
        const validate = await validator.createUserValidator(
            {
                firstName,
                lastName,
                email,
                password,
                confirm_password,
            },
            res
        )
        if (validate && validate.statusCode === 400) return
        const users = await pool.query(queries.getUser, [email])

        if (users.rows.length === 1)
            return util.serverResponse(
                res,
                400,
                false,
                'Account with this email already exist'
            )

        const hashPassword = await util.hashData(password, 10)
        const otp = util.generateCode(6)
        const newUser = await pool.query(queries.createUser, [
            firstName,
            lastName,
            email,
            hashPassword,
            otp,
        ])
        delete newUser.rows[0].password
        delete newUser.rows[0].otp
        // TODO: send otp to email
        util.serverResponse(res, 201, true, {
            message: 'Registration successful',
            user: newUser.rows[0],
        })
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await pool.query(queries.getUsers)
        util.serverResponse(res, 200, true, users.rows)
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

const activateOrDeactivate = async (req, res) => {
    try {
        const { email } = req.body
        const activate = JSON.parse(req.params.activate)
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

        if (users.rows[0].isactive && activate)
            return util.serverResponse(
                res,
                400,
                false,
                'Account already Active'
            )
        if (!users.rows[0].isactive && !activate)
            return util.serverResponse(
                res,
                400,
                false,
                'Account already Inactive'
            )

        const active = await pool.query(queries.activateOrDeactivate, [
            activate,
            email,
        ])
        logger().info(
            `user with email ${email} ${
                activate ? 'activated' : 'deactivated'
            } successfully`
        )
        return util.serverResponse(
            res,
            200,
            true,
            `Account ${activate ? 'activated' : 'deactivated'} successfully`
        )
    } catch (error) {
        util.serverResponse(res, 500, false, error)
    }
}

export default { createUser, getUsers, activateOrDeactivate }
