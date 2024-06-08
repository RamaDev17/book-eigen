/**
 * @openapi
 * /api/books:
 *   get:
 *     tags:
 *       - Books
 *     description: Get All Books
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *         default: 10
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword for searching books by title or author
 *         default: ''
 *     responses:
 *       200:
 *         description: get all book success
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
 *                         example: 2
 *                       code:
 *                         type: string
 *                         example: B-01
 *                       title:
 *                         type: string
 *                         example: Javascript for begginer
 *                       author:
 *                         type: string
 *                         example: jhon
 *                       stock:
 *                         type: integer
 *                         example: 1
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T05:45:16.239Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T21:01:09.447Z
 *                       book_borrowed:
 *                         type: array
 *                         items:
 *                           type: object
 *                         example: []
 *                       borrowedCount:
 *                         type: integer
 *                         example: 0
 */

/**
 * @openapi
 * /api/books:
 *   post:
 *     tags:
 *       - Books
 *     description: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Unique code for the book
 *                 example: B-01
 *               title:
 *                 type: string
 *                 description: Title of the book
 *                 example: Javascript for beginner
 *               author:
 *                 type: string
 *                 description: Author of the book
 *                 example: jhon
 *               stock:
 *                 type: integer
 *                 description: Number of copies available
 *                 example: 1
 *     responses:
 *       201:
 *         description: create book success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: create book success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the book
 *                       example: 3
 *                     code:
 *                       type: string
 *                       description: Unique code for the book
 *                       example: B-02
 *                     title:
 *                       type: string
 *                       description: Title of the book
 *                       example: Javascript for beginner
 *                     author:
 *                       type: string
 *                       description: Author of the book
 *                       example: jhon
 *                     stock:
 *                       type: integer
 *                       description: Number of copies available
 *                       example: 1
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the book was created
 *                       example: 2024-06-08T02:00:52.547Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the book was last updated
 *                       example: 2024-06-08T02:00:52.547Z
 */

/**
 * @openapi
 * /api/books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     description: Get detail of a book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book
 *         example: 3
 *     responses:
 *       200:
 *         description: Get detail book success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get detail book success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The unique identifier for the book
 *                       example: 3
 *                     code:
 *                       type: string
 *                       description: The unique code for the book
 *                       example: B-02
 *                     title:
 *                       type: string
 *                       description: The title of the book
 *                       example: Javascript for begginer
 *                     author:
 *                       type: string
 *                       description: The author of the book
 *                       example: jhon
 *                     stock:
 *                       type: integer
 *                       description: The current stock of the book
 *                       example: 1
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the book was created
 *                       example: 2024-06-08T02:00:52.547Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The timestamp when the book was last updated
 *                       example: 2024-06-08T02:00:52.547Z
 */

/**
 * @openapi
 * /api/books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     description: Update a book's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The code of the book
 *                 example: B-02
 *               title:
 *                 type: string
 *                 description: The title of the book
 *                 example: Javascript for begginer updated
 *               author:
 *                 type: string
 *                 description: The author of the book
 *                 example: jhon updated
 *               stock:
 *                 type: integer
 *                 description: The number of books in stock
 *                 example: 1
 *     responses:
 *       200:
 *         description: update book success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: update book success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The ID of the book
 *                       example: 1
 *                     code:
 *                       type: string
 *                       description: The code of the book
 *                       example: B-02
 *                     title:
 *                       type: string
 *                       description: The title of the book
 *                       example: Javascript for begginer updated
 *                     author:
 *                       type: string
 *                       description: The author of the book
 *                       example: jhon updated
 *                     stock:
 *                       type: integer
 *                       description: The number of books in stock
 *                       example: 3
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the book record
 *                       example: 2024-06-08T02:00:52.547Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: The last update timestamp of the book record
 *                       example: 2024-06-08T02:04:31.758Z
 */

/**
 * @openapi
 * /api/books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book by its ID
 *     description: Delete a book from the database using its unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The unique ID of the book to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: delete book success
 */
