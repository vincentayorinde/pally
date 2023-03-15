import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const serverResponse = (res, code, success, data) => {
    return res.status(code).json({ success, data })
}

const serverRequest = async (method, url, data = {}, headers) => {
    const res = await axios({ method, url, data, headers })
    return res
}

const hashData = async (data, salt) => {
    const hashedData = await bcrypt.hash(data, salt)
    return hashedData
}

const compareHash = async (data, guard) => {
    const validData = await bcrypt.compare(data, guard)
    return validData
}

const jwtTokens = ({ user_id, user_name, user_email }) => {
    const user = { user_id, user_name, user_email }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20s',
    })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '5m',
    })
    return { accessToken, refreshToken }
}

const pagination = (page, size, data) => {
    return {
        page: parseInt(page),
        size: parseInt(size),
        next:
            parseInt(size) < parseInt(data.rows[0] && data.rows[0].total_count)
                ? true
                : false,
        previous: parseInt(page) > 1 ? true : false,
        total: parseInt(data.rows[0] && data.rows[0].total_count),
    }
}

const generateCode = (length) => {
    let result = ''
    let characters = process.env.CODE_GENERATOR
    let charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}

const numberTo2DecimalPlaces = (number) => {
    return Number(parseFloat(number).toFixed(2))
}

const getURL = () =>
    process.env.DATABASE_URL ? process.env.PROD_URL : process.env.DEV_URL

export default {
    serverResponse,
    hashData,
    compareHash,
    jwtTokens,
    pagination,
    generateCode,
    serverRequest,
    numberTo2DecimalPlaces,
    getURL,
}
