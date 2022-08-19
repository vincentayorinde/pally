import pool from "../../db/db.js";
import util from '../../utils/util.js'
import queries from "../../db/queries/users.js";


const createUser = async (req, res) => {
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

const getUsers = async (req, res) => {
    try {
        console.log('getting users');
      const users = await pool.query(queries.getUsers);
      util.serverResponse(res, 200, true,  users.rows)
    } catch (error) {
      util.serverResponse(res, 500, false,  error)
    }
  };

export default { createUser, getUsers };
