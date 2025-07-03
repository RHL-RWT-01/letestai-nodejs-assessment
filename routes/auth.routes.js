import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Missing fields
 *       409:
 *         description: User already exists
 */
authRouter.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in and receive a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 */
authRouter.post('/login', login);

export default authRouter;
