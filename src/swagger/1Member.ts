/**
 * @openapi
 * /api/members:
 *   get:
 *     tags:
 *       - Members
 *     description: Get All Members
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         default: ''
 *     responses:
 *       200:
 *         description: get members success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get members success
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
 *                         example: 3
 *                       code:
 *                         type: string
 *                         example: M-02
 *                       name:
 *                         type: string
 *                         example: fulanah2
 *                       penaltyEndDate:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-25T17:00:00.000Z
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T14:28:38.622Z
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-06-07T14:45:06.215Z
 *                       book_borrowed:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 10
 *                             borrow_date:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-06-25T17:00:00.000Z
 *                             return_date:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-06-26T17:00:00.000Z
 *                             bookId:
 *                               type: integer
 *                               example: 2
 *                             memberId:
 *                               type: integer
 *                               example: 3
 *                             created_at:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-06-07T21:00:27.327Z
 *                             updated_at:
 *                               type: string
 *                               format: date-time
 *                               example: 2024-06-07T21:01:09.443Z
 *                       countBookBorrowed:
 *                         type: integer
 *                         example: 0
 *                       countBookRetuned:
 *                         type: integer
 *                         example: 1
 * 
 */

/**
 * @openapi
 * /api/members:
 *   post:
 *     tags:
 *       - Members
 *     description: Create a new member
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the member
 *                 example: fulanah
 *               code:
 *                 type: string
 *                 description: Unique code for the member
 *                 example: M-01
 *     responses:
 *       201:
 *         description: Member created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: create member success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the member
 *                       example: 4
 *                     code:
 *                       type: string
 *                       description: Unique code for the member
 *                       example: M-01
 *                     name:
 *                       type: string
 *                       description: Name of the member
 *                       example: fulanah
 *                     penaltyEndDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: End date of any penalty the member has, null if no penalty
 *                       example: null
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was created
 *                       example: 2024-06-08T01:03:33.560Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was last updated
 *                       example: 2024-06-08T01:03:33.560Z
 */

/**
 * @openapi
 * /api/members/{id}:
 *   get:
 *     tags:
 *       - Members
 *     description: Get detail of a specific member by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Unique identifier of the member
 *         example: 4
 *     responses:
 *       200:
 *         description: get detail member success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: get detail member success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier of the member
 *                       example: 4
 *                     code:
 *                       type: string
 *                       description: Unique code of the member
 *                       example: M-01
 *                     name:
 *                       type: string
 *                       description: Name of the member
 *                       example: fulanah
 *                     penaltyEndDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: End date of any penalty the member has, null if no penalty
 *                       example: null
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was created
 *                       example: 2024-06-08T01:03:33.560Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was last updated
 *                       example: 2024-06-08T01:03:33.560Z
 */

/**
 * @openapi
 * /api/members/{id}:
 *   put:
 *     description: Update an existing member
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the member to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the member
 *               code:
 *                 type: string
 *                 description: Updated code for the member
 *     responses:
 *       200:
 *         description: Member updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: update member success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the member
 *                       example: 4
 *                     code:
 *                       type: string
 *                       description: Updated code for the member
 *                       example: M-01
 *                     name:
 *                       type: string
 *                       description: Updated name of the member
 *                       example: fulanah updated
 *                     penaltyEndDate:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *                       description: End date of any penalty the member has, null if no penalty
 *                       example: null
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was created
 *                       example: 2024-06-08T01:03:33.560Z
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp when the member was last updated
 *                       example: 2024-06-08T01:15:42.516Z
 */

/**
 * @openapi
 * /api/members/{id}:
 *   delete:
 *     description: Delete a member by ID
 *     tags:
 *       - Members
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the member to be deleted
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: delete member success
 */
