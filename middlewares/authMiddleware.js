import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';



const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    try {
        const userInfo = jwt.verify(token, JWT_SECRET);
        req.user = userInfo;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token' });
    }
}

export default authMiddleware;