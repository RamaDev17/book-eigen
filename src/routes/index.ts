import { Router } from 'express'
import MemberRoute from './MemberRoute'
import BookRoute from './BookRoute'
import BookBorrowedRoute from './BookBorrowedRoute'

const app = Router()

app.use('/api', MemberRoute)
app.use('/api', BookRoute)
app.use('/api', BookBorrowedRoute)

export default app