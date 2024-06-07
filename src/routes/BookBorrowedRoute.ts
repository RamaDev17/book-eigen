import { Router } from "express";
import { createBookBorrowed, deletebookBorrowed, detailBookBorrowed, getAllBookBorrowed, returnBookBorrowed, updateBookBorrowed } from "../controller/BookBorrowed";

const BookBorrowedRoute = Router();

BookBorrowedRoute.get('/book-borroweds', getAllBookBorrowed)
BookBorrowedRoute.post('/book-borroweds', createBookBorrowed)
BookBorrowedRoute.get('/book-borroweds/:id', detailBookBorrowed)
BookBorrowedRoute.put('/book-borroweds/:id', updateBookBorrowed)
BookBorrowedRoute.delete('/book-borroweds/:id', deletebookBorrowed)
BookBorrowedRoute.post('/return-book-borroweds/:id', returnBookBorrowed)

export default BookBorrowedRoute