import { type NextFunction, type Request, type Response } from 'express'
import prisma from '../utils/prisma'
import { createMemberValidation, updateMemberValidation } from '../validators/MemberValidator'
import { Prisma } from '@prisma/client';
import { json } from 'stream/consumers';

export const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
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
                        name: {
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
                ],
            }
            : {};

        const data = await prisma.member.findMany({
            skip,
            take: limit,
            where: whereClause,
            include: {
                book_borrowed: true,
            }
        })

        // Hitung total item untuk pagination
        const totalMembers = await prisma.member.count({
            where: whereClause
        });

        // Hitung jumlah halaman
        const totalPages = Math.ceil(totalMembers / limit);

        //menghitung jumlah buku yang sedang dipinjam dan buku yang sudah dikembalikan
        const dataObject = JSON.parse(JSON.stringify(data))
        dataObject.map((member: { book_borrowed: any[]; countBookBorrowed: number; countBookRetuned: number; }) => {
            let countBookBorrowed = 0;
            let countBookRetuned = 0;
            member.book_borrowed.map(book => {
                book.return_date ? countBookRetuned++ : countBookBorrowed++
            })

            member.countBookBorrowed = countBookBorrowed
            member.countBookRetuned = countBookRetuned
        })

        return res.status(200).json({
            message: 'get all members success',
            meta: {
                totalItems: totalMembers,
                currentPage: page,
                pageSize: limit,
                totalPages: totalPages,
            },
            data: dataObject
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get all members failed',
            error: "MEMBER01 : " + error
        })
    }
}

export const createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code, name } = await createMemberValidation.validateAsync(req.body)

        const existingCode = await prisma.member.findFirst({
            where: {
                code
            }
        })

        if (existingCode) throw new Error('Code already exists')

        const data = await prisma.member.create({
            data: {
                code,
                name,
            }
        })

        return res.status(200).json({
            message: 'create member success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'create member failed',
            error: "MEMBER02 : " + String((error as Error).message)
        })
    }

}

export const detailMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        const data = await prisma.member.findFirst({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'get detail member success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'get member failed',
            error: "MEMBER03 : " + String((error as Error).message)
        })
    }
}

export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)
        const { code, name } = await updateMemberValidation.validateAsync(req.body)

        if (code) {
            const existingCode = await prisma.member.findFirst({
                where: {
                    code
                }
            })

            if (existingCode && existingCode.id !== id) throw new Error('Code already exists')
        }

        const data = await prisma.member.update({
            where: {
                id
            },
            data: {
                code,
                name
            }
        })

        return res.status(200).json({
            message: 'update member success',
            data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'update member failed',
            error: "MEMBER04 : " + String((error as Error).message)
        })
    }
}

export const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id)

        await prisma.member.delete({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'delete member success',
        })
    } catch (error) {
        return res.status(400).json({
            message: 'delete member failed',
            error: "MEMBER05 : " + String((error as Error).message)
        })
    }
}