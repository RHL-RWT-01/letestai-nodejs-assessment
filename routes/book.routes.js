import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import {
  createBook,
  editBook,
  getBook,
  listBooks,
  removeBook,
  searchBooksByGenre
} from '../controllers/book.controller.js';

const booksRouter = express.Router();

// Apply auth middleware to all routes
booksRouter.use(auth);

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management routes
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get paginated list of books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Results per page
 *     responses:
 *       200:
 *         description: List of books
 */
booksRouter.get('/', listBooks);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Search books by genre
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre to filter
 *     responses:
 *       200:
 *         description: Filtered book list
 *       400:
 *         description: Genre query param is required
 */
booksRouter.get('/search', searchBooksByGenre);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
booksRouter.get('/:id', getBook);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - publishedYear
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Book created
 */
booksRouter.post('/', createBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publishedYear:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Book updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Book not found
 */
booksRouter.put('/:id', editBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       204:
 *         description: Book deleted
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Book not found
 */
booksRouter.delete('/:id', removeBook);

export default booksRouter;
