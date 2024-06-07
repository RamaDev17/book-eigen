import Joi from "joi";
import JoiDate from '@joi/date';

const ExtendedJoi = Joi.extend(JoiDate);

export const createBookBorrowedValidation = ExtendedJoi.object({
    bookId: ExtendedJoi.number().required(),
    memberId: ExtendedJoi.number().required(),
    borrowDate: ExtendedJoi.date().format('YYYY-MM-DD').required(),
})

export const updateBookBorrowedValidation = ExtendedJoi.object({
    borrowDate: ExtendedJoi.date().format('YYYY-MM-DD').required(),
})

export const returnBookBorrowedValidation = ExtendedJoi.object({
    returnDate: ExtendedJoi.date().format('YYYY-MM-DD').required(),
})
