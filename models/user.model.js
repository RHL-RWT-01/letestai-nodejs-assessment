import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { generateId } from '../lib/generateId.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../db/users.json');

export async function getUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data || '[]');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.writeFile(filePath, '[]');
            return [];
        }
        throw err;
    }
}


export async function saveUsers(users) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}


export async function findUserByEmail(email) {
    const users = await getUsers();
    return users.find((u) => u.email === email);
}


export async function createUser({ email, password }) {
    const users = await getUsers();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: generateId('user'),
        email,
        password: hashedPassword,
    };

    users.push(newUser);
    await saveUsers(users);
    return newUser;
}
