### LetestAI Node.js Assessment

Backend RESTful API for a Bookstore system built using
Node.js, Express, and JWT authentication with file-based storage and
auto-generated API documentation via Swagger.

Setup Instructions

1\. Clone the repository
```
git clone https://github.com/RHL-RWT-01/letestai-nodejs-assessment.git
cd letestai-nodejs-assessment
```

2\. Install dependencies
```
npm install
```

3\. Run server
```
npm run dev
```

Server will run at: http://localhost:3000


## Auth Endpoints

POST /api/auth/register – Register a new user

POST /api/auth/login – Login and get a JWT token


## Book Routes (require JWT token)

Get all books (with pagination) (GET)
```
http://localhost:3000/api/books?page=1&&limit=10
```

Search books by genre (GET)
```
http://localhost:3000/api/books/search?genre=
```

Get book by ID (GET)
```
http://localhost:3000/api/books/:id 
```

Add a new book (POST )
```
http://localhost:3000/api/books
```

Update a book (PUT )

```
http://localhost:3000/api/books/:id
```

Delete a book (DELETE )


```
http://localhost:3000/api/books/:id
```


### API Docs
Swagger documentation is available at:

```
http://localhost:3000/api-docs
