import jsonwebtoken from 'jsonwebtoken';
import { User } from '../../models/index.js';
const { sign, verify } = jsonwebtoken;
export function verifyToken(token) {
    try {
        const data = verify(token, 'some secret');
        return data;
    }
    catch (error) {
        console.log('verify token error', error);
        return false;
    }
}
export function createToken(user_id) {
    const token = sign({ user_id }, 'some secret');
    return token;
}
export const isAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.token;
    if (!token) {
        res.status(401).json({
            message: 'You are not authorized to perform that action'
        });
        return;
    }
    const tokenData = verifyToken(token);
    if (tokenData && typeof tokenData !== 'string') {
        const { user_id } = tokenData;
        const user = await User.findByPk(user_id);
        req.user = user;
        next();
    }
    else {
        res.status(401).json({
            message: 'Invalid token'
        });
    }
};
