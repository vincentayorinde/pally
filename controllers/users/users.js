import util from '../../utils/util.js'


const createUser = (req, res) => {
try {
    const { firstName, lastName, email, password } = req.body;
    const hashPassword = util.hashData(password, 10)
    const newUser = await pool.query(queries.createUser, [
      firstName,
      lastName,
      email,
      hashPassword,
    ]);
    util.serverResponse(res, 201, true, newUser.rows[0])
} catch (error) {
    util.serverResponse(res, 500, false, error)
}
}

export default { createUser };
