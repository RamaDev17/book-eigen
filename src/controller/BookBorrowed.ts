/* 
    # Members can borrow books with conditions
        - Members may not borrow more than 2 books
        - Borrowed books are not borrowed by other members
        - Member is currently not being penalized
    #Member returns the book with conditions
        - The returned book is a book that the member has borrowed
        - If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
    //TODO:
        # Check the book
        - Shows all existing books and quantities
        - Books that are being borrowed are not counted
    # Member check
        - Shows all existing members
        - The number of books being borrowed by each member
*/
import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../utils/prisma'
import { Prisma } from '@prisma/client';
import { createBookBorrowedValidation, returnBookBorrowedValidation, updateBookBorrowedValidation } from '../validators/BookBorrowed';

export const getAllBookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
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
                        book: {
                            title: {
                                contains: keyword,
                                mode: queryMode,
                            },
                        },
                    },
                    {
                        book: {
                            author: {
                                contains: keyword,
                                mode: queryMode,
                            },
                        },
                    },
                    {
                        book: {
                            code: {
                                contains: keyword,
                                mode: queryMode,
                            },
                        },
                    },
                    {
                        member: {
                            name: {
                                contains: keyword,
                                mode: queryMode,
                            },
                        },
                    },
                    {
                        member: {
                            code: {
                                contains: keyword,
                                mode: queryMode,
                            },
                        },
                    },
                ],
            }
            : {};

        const data = await prisma.book_Borrowed.findMany({
            skip,
            take: limit,
            where: whereClause,
            include: {
                book: true,
                member: true
            }
        })

        // Hitung total item untuk pagination
        const totalBookBorrowed = await prisma.book_Borrowed.count();

        // Hitung jumlah halaman
        const totalPages = Math.ceil(totalBookBorrowed / limit);

        return res.status(200).json({
            message: 'get all book success',
            meta: {
                totalItems: totalBookBorrowed,
                currentPage: page,
                pageSize: limit,
                totalPages: totalPages,
            },
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get all book failed',
            error: "BB01 : " + error
        })
    }
}

export const createBookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { bookId, memberId, borrowDate, returnDate } = await createBookBorrowedValidation.validateAsync(req.body)

        // Cek apakah id dari bookId dan memberId sesuai
        const book = await prisma.book.findFirst({
            where: {
                id: bookId
            }
        })

        const member = await prisma.member.findFirst({
            where: {
                id: memberId
            }
        })

        if (!member) {
            return res.status(400).json({
                message: 'create book borrowed failed',
                error: "BB02 : member not found"
            })
        }

        if (!book) {
            return res.status(400).json({
                message: 'create book borrowed failed',
                error: "BB03 : book not found"
            })
        }

        // Cek member penalty
        if (member?.penaltyEndDate && borrowDate < member.penaltyEndDate) {
            return res.status(400).json({
                message: `Member is currently penalized and cannot borrow books until ${member.penaltyEndDate.toISOString().split('T')[0]}.`,
            });
        }

        // Hitung jumlah buku yang sudah dipinjam anggota
        const borrowedBooksCount = await prisma.book_Borrowed.count({
            where: {
                memberId: memberId,
                return_date: null,
            },
        });

        if (borrowedBooksCount > 2) {
            return res.status(400).json({
                message: 'Member cannot borrow more than 2 books.',
            });
        }

        // Cek apakah buku sedang dipinjam oleh anggota lain
        const bookAlreadyBorrowed = await prisma.book_Borrowed.findFirst({
            where: {
                bookId: bookId,
                return_date: null,
            },
        });

        if (bookAlreadyBorrowed) {
            return res.status(400).json({
                message: 'Book is already borrowed by another member.',
            });
        }

        // create data book borrowed
        const bookBorrowed = await prisma.book_Borrowed.create({
            data: {
                borrow_date: borrowDate,
                return_date: returnDate || null,
                book: {
                    connect: { id: bookId },
                },
                member: {
                    connect: { id: memberId },
                },
            },
        });

        // update stock book
        await prisma.book.update({
            where: {
                id: bookId
            },
            data: {
                stock: {
                    decrement: 1
                }
            }
        })

        return res.status(200).json({
            message: 'create book borrowed success.',
            data: bookBorrowed,
        });
    } catch (error) {
        return res.status(400).json({
            message: 'create book borrowed failed',
            error: "BB02 : " + String((error as Error).message)
        })
    }

}

export const detailBookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        const data = await prisma.book_Borrowed.findFirst({
            where: {
                id
            },
            include: {
                book: true,
                member: true
            }
        })

        return res.status(200).json({
            message: 'get book borrowed success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get detail book borrowed failed',
            error: "BB04 : " + String((error as Error).message)
        })
    }
}

//update hanya buat mengubah borrowed_date dengan syarat return_date null
export const updateBookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { borrowDate } = await updateBookBorrowedValidation.validateAsync(req.body)
        const id = parseInt(req.params.id)

        const data = await prisma.book_Borrowed.findFirst({
            where: {
                id
            }
        })

        if (data?.return_date) {
            return res.status(400).json({
                message: 'update book borrowed failed',
                error: "BB05 : book borrowed already returned"
            })
        }

        const updatedData = await prisma.book_Borrowed.update({
            where: {
                id
            },
            data: {
                borrow_date: borrowDate
            }
        })

        return res.status(200).json({
            message: 'update book borrowed success',
            data: updatedData
        })
    } catch (error) {
        return res.status(400).json({
            message: 'update book borrowed failed',
            error: "BB04 : " + String((error as Error).message)
        })
    }
}

export const deletebookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        await prisma.book_Borrowed.delete({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'delete book borrowed success',
        })
    } catch (error) {
        return res.status(400).json({
            message: 'delete book borrowed failed',
            error: "BB05 : " + String((error as Error).message)
        })
    }
}

export const returnBookBorrowed = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)

    try {
        const { returnDate } = await returnBookBorrowedValidation.validateAsync(req.body)
        // Cek apakah anggota pernah meminjam buku ini
        const borrowedBook = await prisma.book_Borrowed.findFirst({
            where: {
                id,
                return_date: null, // Pastikan buku belum dikembalikan
            },
        });

        if (!borrowedBook) {
            return res.status(400).json({
                message: 'This book is not borrowed by the member or has already been returned.',
            });
        }

        // Hitung selisih hari antara tanggal peminjaman dan pengembalian
        const borrowDate = borrowedBook.borrow_date;
        const currentDate = returnDate;
        const timeDiff = Math.abs(currentDate.getTime() - borrowDate.getTime());
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung perbedaan hari
        console.log(dayDiff);
        

        // Jika perbedaan lebih dari 7 hari, kenakan penalti
        if (dayDiff > 7) {
            const penaltyEndDate = returnDate;
            penaltyEndDate.setDate(penaltyEndDate.getDate() + 4);

            await prisma.member.update({
                where: { id: borrowedBook.memberId },
                data: {
                    penaltyEndDate: penaltyEndDate,
                },
            });

            // Update data peminjaman dengan tanggal pengembalian
            await prisma.book_Borrowed.update({
                where: { id: borrowedBook.id },
                data: {
                    return_date: currentDate,
                },
            });

            return res.status(200).json({
                message: `Book returned late. Member is penalized and cannot borrow books until ${penaltyEndDate.toISOString().split('T')[0]}.`,
                data: {
                    borrowedBookId: borrowedBook.id,
                    returnDate: currentDate,
                }
            });
        }

        // Update data peminjaman dengan tanggal pengembalian
        await prisma.book_Borrowed.update({
            where: { id: borrowedBook.id },
            data: {
                return_date: currentDate,
            },
        });

        //update stock book
        await prisma.book.update({
            where: { id: borrowedBook.bookId },
            data: {
                stock: { increment: 1 },
            },
        });

        return res.status(200).json({
            message: 'Book returned success.',
            data: {
                borrowedBookId: borrowedBook.id,
                returnDate: currentDate,
            }
        });
    } catch (error) {
        return res.status(400).json({
            message: 'retrun book borrowed failed',
            error: "BB06 : " + String((error as Error).message)
        })
    }
};
