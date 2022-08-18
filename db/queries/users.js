const getUser = 'SELECT * FROM users WHERE user_email = $1'
const getUsers = 'SELECT * FROM users'
const createUser =
    'INSERT INTO users (firstName,lastName,email,password) VALUES ($1,$2,$3,$4) RETURNING *'

export default {
    getUser,
    getUsers,
    createUser,
}
