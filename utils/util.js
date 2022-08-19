
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const serverResponse = (res, code, success, data) => {
    return res.status(code).json({ success, data });
}

const hashData = async (data, salt) => {
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData
}

const compareHash = async (data, guard) => {
    const validData = await bcrypt.compare(data, guard);
    return validData
}

const jwtTokens = ({ user_id, user_name, user_email }) => {
  const user = { user_id, user_name, user_email };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20s",
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "5m",
  });
  return { accessToken, refreshToken };
};

export default { serverResponse, hashData, compareHash, jwtTokens };