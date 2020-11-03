const router = require('express').Router()
const auth = require('../middlewares/auth')

// Requires authentication for all the routes
router.use(auth)

// Item controller
const cartsController = require('../controllers/cartsController')

// Routes definition

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *           example: 2
 *         quantity:
 *           type: integer
 *           format: int32
 *           example: 9
 *         item_id:
 *           type: integer
 *           format: int64
 *           example: 4
 *         Item:
 *           readOnly: true
 *           $ref: '#/components/schemas/Item'
 *     arrayOfCartItems:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/CartItem'
 */

/**
 * @swagger
 * /cart/add:
 *   post:
 *     summary: Add items to current user's cart
 *     operationId: addCartItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Cart
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A array of cart items 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cart_items:
 *                 $ref: '#/components/schemas/arrayOfCartItems'
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
 *                   example: Items uccessfully added to cart!
 *                 cart_items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/arrayOfCartItems'
 *       400:
 *         description: Bad request
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
 *                   example: No item provided!
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
 *                   example: Please check provided data!
 */
router.post('/add', cartsController.addItems)

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Retrieve current user's cart
 *     operationId: getCart
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Cart
 *     produces:
 *       - application/json
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
 *                   example: Cart succeesfully retrieved!
 *                 cart_items:
*                    $ref: '#/components/schemas/arrayOfCartItems'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       422:
 *         dexcription: cartItem
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
 *                   example: Cannot retrieve cart!
 */
router.get('/', cartsController.getCart)

/**
 * @swagger
 * /cart/{cartItemId}:
 *   delete:
 *     summary: Delete a given cart item
 *     operationId: deleteCartItem
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Cart
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         description: ID of the cart item to be deleted
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Deleted
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
 *                   example: Cart item not found!
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
 *                   example: Cannot delete car item!
 */
router.delete('/:id', cartsController.deleteItem)

module.exports = router