import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../utils/prisma'
import { createBookValidation, updateBookValidation } from '../validators/BookValidator';
import { Prisma } from '@prisma/client';

export const getAllBook = async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const keyword = req.query.keyword as string || '';

    const skip = (page - 1) * limit;

    try {
        const queryMode: Prisma.QueryMode = 'insensitive';
        const whereClause = keyword
            ? {
                OR: [
                    {
                        title: {
                            contains: keyword,
                            mode: queryMode,
                        },
                    },
                    {
                        code: {
                            contains: keyword,
                            mode: queryMode,
                        },
                    },
                    {
                        author: {
                            contains: keyword,
                            mode: queryMode,
                        },
                    },
                ],
            }
            : {};

        const data = await prisma.book.findMany({
            skip,
            take: limit,
            where: whereClause,
            include: {
                book_borrowed: {
                    where: {
                        return_date: null
                    }
                }
            }
        })

        // Hitung total item untuk pagination
        const totalBook = await prisma.book.count({
            where: whereClause
        });

        // Hitung jumlah halaman
        const totalPages = Math.ceil(totalBook / limit);

        //menghitung total buku yang sedang dipinjam
        const booksWithBorrowedCount = data.map(book => ({
            ...book,
            borrowedCount: book.book_borrowed.length 
        }));

        return res.status(200).json({
            message: 'get all book success',
            meta: {
                totalItems: totalBook,
                currentPage: page,
                pageSize: limit,
                totalPages: totalPages,
            },
            data: booksWithBorrowedCount
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get all book failed',
            error: "BOOK01 : " + error
        })
    }
}

export const createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code, title, author, stock } = await createBookValidation.validateAsync(req.body)

        const existingCode = await prisma.book.findFirst({
            where: {
                code
            }
        })

        if (existingCode) throw new Error('Code already exists')

        const data = await prisma.book.create({
            data: {
                code,
                title,
                author,
                stock
            }
        })

        return res.status(200).json({
            message: 'create book success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'create book failed',
            error: "BOOK02 : " + String((error as Error).message)
        })
    }

}

export const detailBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        const data = await prisma.book.findFirst({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'get detail book success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get detail book failed',
            error: "BOOK03 : " + String((error as Error).message)
        })
    }
}

export const updatebook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        const { code, title, author, stock } = await updateBookValidation.validateAsync(req.body)

        if (code) {
            const existingCode = await prisma.book.findFirst({
                where: {
                    code
                }
            })

            if (existingCode && existingCode.id !== id) throw new Error('Code already exists')
        }

        const data = await prisma.book.update({
            where: {
                id
            },
            data: {
                code,
                title,
                author,
                stock
            }
        })

        return res.status(200).json({
            message: 'update book success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'update book failed',
            error: "BOOK04 : " + String((error as Error).message)
        })
    }
}

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        await prisma.book.delete({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'delete book success',
        })
    } catch (error) {
        return res.status(400).json({
            message: 'delete book failed',
            error: "BOOK05 : " + String((error as Error).message)
        })
    }
}