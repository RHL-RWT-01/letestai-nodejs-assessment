import { v4 as uuidv4 } from 'uuid';


export const generateId = (type = 'user') => {
    if (type === 'book') {
        return `book-${uuidv4()}`;
    } else if (type === 'user') {
        return `user-${uuidv4()}`;
    } else {
        throw new Error('Invalid type for ID, use "book" or "user"');
    }
}