import { findUserByEmail, createUser } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/generateToken.js';

export const register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: 'Email and password are required' });

    const existingUser = await findUserByEmail(email);
    if (existingUser)
        return res.status(409).json({ msg: 'User already exists' });

    const user = await createUser({ email, password });

    res.status(201).json({
        msg: 'User registered successfully',
        user: { id: user.id, email: user.email }
    });
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res.status(400).json({ msg: 'Email and password are required' });

    const user = await findUserByEmail(email);
    if (!user)
        return res.status(401).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
        return res.status(401).json({ msg: 'Invalid credentials' });

    const token = generateToken({ id: user.id, email: user.email });

    res.json({ msg: 'Login successful', token });
};
