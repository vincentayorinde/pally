const getUser = 'SELECT * FROM users WHERE email = $1'
const getUsers = 'SELECT * FROM users'
const createUser =
    'INSERT INTO users (firstName,lastName,email,password,otp) VALUES ($1,$2,$3,$4,$5) RETURNING *'
const verifyAndActive = 'UPDATE users SET otp=null, emailVerified=true,isActive=true WHERE otp=$1 and email=$2'
const activateOrDeactivate = 'UPDATE users SET isActive=$1 WHERE email=$2'
const setRefreshToken = 'UPDATE users SET refresh_token=$1 WHERE email=$2'
const setOTP = 'UPDATE users SET otp=$1 WHERE email=$2'
const resetPassword = 'UPDATE users SET otp=null,password=$1 WHERE email=$2'

export default {
    getUser,
    getUsers,
    createUser,
    verifyAndActive,
    activateOrDeactivate,
    setRefreshToken,
    setOTP,
    resetPassword
}
