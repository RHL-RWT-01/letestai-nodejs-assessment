import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import booksRouter from './routes/book.routes.js';
import { PORT } from './config/config.js';
import { logger } from './middlewares/logger.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const specs = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LetestAI Node.js API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [
            {
                bearerAuth: [] 
            }
        ]
    },
    apis: ['./routes/*.js'],
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Middlewares
app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send('LetestAI Node.js Assessment');
});

//to handle auth routes
app.use('/api/auth', authRouter);

//to handle books routes
app.use('/api/books', booksRouter);



// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})