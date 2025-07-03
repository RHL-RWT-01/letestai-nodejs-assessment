import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateId } from '../lib/generateId.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '../db/books.json');

async function read() {
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

async function write(db) {
    await fs.writeFile(filePath, JSON.stringify(db, null, 2));
}

export async function getAllBooks() {
    return read();                              
}

export async function findBookById(id) {
    const db = await read();
    return db.find(b => b.id === id);            
}

export async function addBook({ title, author, genre, publishedYear, userId }) {
    const db = await read();
    const book = {
        id: generateId('book'),             
        title,
        author,
        genre,
        publishedYear,
        userId
    };
    db.push(book);
    await write(db);
    return book;
}

export async function updateBook(id, patch) {
    const db = await read();
    const idx = db.findIndex(b => b.id === id);
    if (idx === -1) return null;
    db[idx] = { ...db[idx], ...patch };
    await write(db);
    return db[idx];
}

export async function deleteBook(id) {
    const db = await read();
    const newDb = db.filter(b => b.id !== id);
    if (newDb.length === db.length) return false;
    await write(newDb);
    return true;
}
