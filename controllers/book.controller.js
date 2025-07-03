import {
    getAllBooks,
    findBookById,
    addBook,
    updateBook,
    deleteBook
} from '../models/book.model.js';


export const listBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const allBooks = await getAllBooks();

        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const paginatedBooks = allBooks.slice(startIndex, startIndex + parseInt(limit));

        res.json({
            total: allBooks.length,
            page: parseInt(page),
            limit: parseInt(limit),
            data: paginatedBooks,
        });
    } catch (e) {
        next(e);
    }
};


export const getBook = async (req, res, next) => {
    try {
        const book = await findBookById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        res.json(book);
    } catch (e) { next(e); }
};


export const createBook = async (req, res, next) => {
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title || !author || !genre || !publishedYear)
            return res.status(400).json({ msg: 'All fields are required' });

        const book = await addBook({
            title,
            author,
            genre,
            publishedYear,
            userId: req.user.id
        });
        res.status(201).json(book);
    } catch (e) { next(e); }
};


export const editBook = async (req, res, next) => {
    try {
        const book = await findBookById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        if (book.userId !== req.user.id)
            return res.status(403).json({ msg: 'Not your book' });

        const updated = await updateBook(req.params.id, req.body);
        res.json(updated);
    } catch (e) { next(e); }
};


export const removeBook = async (req, res, next) => {
    try {
        const book = await findBookById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
        if (book.userId !== req.user.id)
            return res.status(403).json({ msg: 'Not your book' });

        await deleteBook(req.params.id);
        res.status(204).json({ msg: 'Book deleted successfully' });
    } catch (e) { next(e); }
};



export const searchBooksByGenre = async (req, res, next) => {
    try {
        const { genre } = req.query;
        console.log(genre);
        if (!genre) return res.status(400).json({ msg: 'Genre query param is required' });

        const allBooks = await getAllBooks();
        const filtered = allBooks.filter(
            (book) => book.genre.toLowerCase() === genre.toLowerCase()
        );

        res.json({ total: filtered.length, data: filtered });
    } catch (e) {
        console.log("first")
        next(e);
    }
};
