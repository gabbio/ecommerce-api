const router = require('express').Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

// Protect relevant routes
router.use(auth)

// Item controller
const itemsController = require('../controllers/itemsController')

// Routes definition

/**
 * @swagger
 * components:
 *   schemas:
 *     arrayOfItems:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Item'
 */

/**
 * @swagger
 * 
 * /items:
 *   get:
 *     summary: Get a paginated list of items
 *     operationId: getItems
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Item
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Number of the page
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *       - name: perPage
 *         in: query
 *         description: Number of items to return per page
 *         required: false
 *         schema:
 *           type: integer
 *           format: int32
 *           minimum: 1
 *       - name: byPrice
 *         in: query
 *         description: Price sort order applied to the list
 *         required: false
 *         type: string
 *         schema:
 *           type: string
 *           enum: [DESC, ASC]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Items successfully retrieved!
 *                 items:
 *                   $ref: '#/components/schemas/arrayOfItems'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.get('/', itemsController.getAllItems)

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     operationId: createItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Item
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: An item object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item successfully created!
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Item successfully created!
 *                 error:
 *                   type: string
 *                   example: Photo value must be a URL
 */
router.post('/', isAdmin, itemsController.addItem)

/**
 * @swagger
 * /items/{itemId}:
 *   get:
 *     summary: Retrieve a given item
 *     operationId: getItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Item
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: itemId
 *         description: ID of the item to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item successfully retrieved!
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Item not found!
 *       500:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.get('/:id', itemsController.getItem)

/**
 * @swagger
 * /items/{itemId}:
 *   put:
 *     summary: Update a given item
 *     operationId: updateItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Item
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: itemId
 *         description: ID of the item to be deleted
 *         required: true
 *         type: integer
 *     requestBody:
 *       description: An item object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       204:
 *         description: Updated
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description: Not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Item not found!
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.put('/:id', isAdmin, itemsController.updateItem)

/**
 * @swagger
 * /items/{itemId}:
 *   delete:
 *     summary: Delete a given item
 *     operationId: deleteItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Item
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: itemId
 *         description: ID of the item to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Item successfully deleted!
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       404:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Item not found!
 *       422:
 *         description: Unprocessable entity
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Something went wrong!
 */
router.delete('/:id', isAdmin, itemsController.deleteItem)

module.exports = router