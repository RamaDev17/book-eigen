/**
 * @openapi
 * /api/book-borroweds:
 *   get:
 *     tags:
 *       - BookBorroweds
 *     description: Get all book borrow records
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           description: Page number for pagination
 *         required: false
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           description: Number of items per page
 *         required: false
 *         example: 10
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           description: Keyword for searching book borrow records
 *         required: false
 *         example: ''
 *     responses:
 *       200:
 *         description: Get all book borrow records success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get all book success
 *                 meta:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       example: 1
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       borrow_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-25T17:00:00.000Z
 *                       return_date:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-26T17:00:00.000Z
 *                       bookId:
 *                         type: integer
 *                         example: 2
 *                       memberId:
 *                         type: integer
 *                         example: 3
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T21:00:27.327Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T21:01:09.443Z
 *                       book:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 2
 *                           code:
 *                             type: string
 *                             example: B-01
 *                           title:
 *                             type: string
 *                             example: Javascript for beginners
 *                           author:
 *                             type: string
 *                             example: John
 *                           stock:
 *                             type: integer
 *                             example: 1
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-06-07T05:45:16.239Z
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-06-07T21:01:09.447Z
 *                       member:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           code:
 *                             type: string
 *                             example: M-02
 *                           name:
 *                             type: string
 *                             example: fulanah2
 *                           penaltyEndDate:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-06-25T17:00:00.000Z
 *                           created_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-06-07T14:28:38.622Z
 *                           updated_at:
 *                             type: string
 *                             format: date-time
 *                             example: 2024-06-07T14:45:06.215Z
 */

/**
 * @openapi
 * /api/book-borroweds:
 *   post:
 *     tags:
 *       - BookBorroweds
 *     description: Create a new book borrowed record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowDate:
 *                 type: string
 *                 format: date
 *                 description: Date when the book is borrowed
 *                 example: 2024-06-26
 *               bookId:
 *                 type: integer
 *                 description: ID of the book being borrowed
 *                 example: 2
 *               memberId:
 *                 type: integer
 *                 description: ID of the member borrowing the book
 *                 example: 3
 *     responses:
 *       201:
 *         description: create book borrowed success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: create book borrowed success.
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the borrowed record
 *                       example: 11
 *                     borrow_date:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time when the book was borrowed
 *                       example: 2024-06-25T17:00:00.000Z
 *                     return_date:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: Date and time when the book was returned, null if not returned yet
 *                       example: null
 *                     bookId:
 *                       type: integer
 *                       description: ID of the borrowed book
 *                       example: 2
 *                     memberId:
 *                       type: integer
 *                       description: ID of the member who borrowed the book
 *                       example: 3
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the record was created
 *                       example: 2024-06-08T04:00:32.544Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the record was last updated
 *                       example: 2024-06-08T04:00:32.544Z
 */

/**
 * @openapi
 * /api/book-borroweds/{id}:
 *   get:
 *     tags:
 *       - BookBorroweds
 *     description: Get details of a book borrowed by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the book borrowed
 *         example: 11
 *     responses:
 *       200:
 *         description: get book borrowed success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get book borrowed success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the book borrowed
 *                       example: 11
 *                     borrow_date:
 *                       type: string
 *                       format: date-time
 *                       description: The date the book was borrowed
 *                       example: 2024-06-25T17:00:00.000Z
 *                     return_date:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: The date the book was returned, or null if not returned
 *                       example: null
 *                     bookId:
 *                       type: integer
 *                       description: The ID of the borrowed book
 *                       example: 2
 *                     memberId:
 *                       type: integer
 *                       description: The ID of the member who borrowed the book
 *                       example: 3
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the book borrowing record was created
 *                       example: 2024-06-08T04:00:32.544Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the book borrowing record was last updated
 *                       example: 2024-06-08T04:00:32.544Z
 *                     book:
 *                       type: object
 *                       description: The details of the borrowed book
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the book
 *                           example: 2
 *                         code:
 *                           type: string
 *                           description: The unique code for the book
 *                           example: B-01
 *                         title:
 *                           type: string
 *                           description: The title of the book
 *                           example: Javascript for beginner
 *                         author:
 *                           type: string
 *                           description: The author of the book
 *                           example: jhon
 *                         stock:
 *                           type: integer
 *                           description: The current stock of the book
 *                           example: 0
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the book was created
 *                           example: 2024-06-07T05:45:16.239Z
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the book details were last updated
 *                           example: 2024-06-08T04:00:32.555Z
 *                     member:
 *                       type: object
 *                       description: The details of the member who borrowed the book
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: The ID of the member
 *                           example: 3
 *                         code:
 *                           type: string
 *                           description: The unique code for the member
 *                           example: M-02
 *                         name:
 *                           type: string
 *                           description: The name of the member
 *                           example: fulanah2
 *                         penaltyEndDate:
 *                           type: string
 *                           format: date-time
 *                           description: The end date of any penalty for the member
 *                           example: 2024-06-25T17:00:00.000Z
 *                         created_at:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the member was created
 *                           example: 2024-06-07T14:28:38.622Z
 *                         updated_at:
 *                           type: string
 *                           format: date-time
 *                           description: The timestamp when the member details were last updated
 *                           example: 2024-06-07T14:45:06.215Z
 */

/**
 * @openapi
 * /api/book-borroweds/{id}:
 *   put:
 *     tags:
 *       - BookBorroweds
 *     description: Update the borrow date of a borrowed book
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the borrowed book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               borrowDate:
 *                 type: string
 *                 format: date
 *                 description: The new borrow date for the book
 *                 example: "2024-06-26"
 *     responses:
 *       200:
 *         description: update book borrowed success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: update book borrowed success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the borrowed book record
 *                       example: 11
 *                     borrow_date:
 *                       type: string
 *                       format: date-time
 *                       description: The date when the book was borrowed
 *                       example: 2024-05-31T17:00:00.000Z
 *                     return_date:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: The date when the book was returned, null if not returned yet
 *                       example: null
 *                     bookId:
 *                       type: integer
 *                       description: Unique identifier for the book
 *                       example: 2
 *                     memberId:
 *                       type: integer
 *                       description: Unique identifier for the member who borrowed the book
 *                       example: 3
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the borrow record was created
 *                       example: 2024-06-08T04:00:32.544Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the borrow record was last updated
 *                       example: 2024-06-08T04:03:41.238Z
 */

/**
 * @openapi
 * /api/return-book-borroweds/{id}:
 *   post:
 *     description: Return a borrowed book
 *     tags:
 *       - BookBorroweds
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the borrowed book record to be returned
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               returnDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the book is returned
 *                 example: "2024-06-05"
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book returned success.
 *                 data:
 *                   type: object
 *                   properties:
 *                     borrowedBookId:
 *                       type: integer
 *                       description: The ID of the returned borrowed book record
 *                       example: 11
 *                     returnDate:
 *                       type: string
 *                       format: date-time
 *                       description: The date when the book was returned
 *                       example: "2024-06-03T17:00:00.000Z"
 */

/**
 * @openapi
 * /api/book-borroweds/{id}:
 *   delete:
 *     tags:
 *       - BookBorroweds
 *     description: Delete a book borrowed entry by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the book borrowed entry to be deleted
 *         example: 1
 *     responses:
 *       200:
 *         description: Delete book borrowed success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: delete book borrowed success
 */
