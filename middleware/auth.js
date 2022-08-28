import jwt from 'jsonwebtoken'
import util from '../utils/util.js'

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return util.serverResponse(res, 401, false, 'Unauthorized')
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error)
            return util.serverResponse(res, 403, false, {
                message: 'Forbidden',
                error: error.message,
            })
        req.user = user
        next()
    })
}

export { authenticateToken }
