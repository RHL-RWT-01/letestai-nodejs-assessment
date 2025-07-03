import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';


export const generateToken = (user) => {
    if (!user || !user.id || !user.email) {
        throw new Error('Invalid user object');
    }

    const payload = {
        id: user.id,
        email: user.email
    };

    const options = {
        expiresIn: '10h',
    };

    return jwt.sign(payload, JWT_SECRET, options);
}