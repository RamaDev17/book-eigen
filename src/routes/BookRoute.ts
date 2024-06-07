import { Router } from "express";
import { createBook, deleteBook, detailBook, getAllBook, updatebook } from "../controller/BookController";

const BookRoute = Router();

BookRoute.get('/books', getAllBook)
BookRoute.post('/books', createBook)
BookRoute.get('/books/:id', detailBook)
BookRoute.put('/books/:id', updatebook)
BookRoute.delete('/books/:id', deleteBook)

export default BookRoute