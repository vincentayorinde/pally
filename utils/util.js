
import bcrypt from 'bcrypt';

const serverResponse = (res, code, success, data) => {
    return res.status(code).json({ success, data });
}

const hashData = (data, salt) => {
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData
}

export default { serverResponse, hashData };