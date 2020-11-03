const router = require('express').Router()

// User controller
const usersController = require('../controllers/usersController')

// Routes definition

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *           example: 3
 *         firstname:
 *           type: string
 *           example: John
 *         lastname:
 *           type: string
 *           example: Doe 
 *         email:
 *           type: string
 *           format: email
 *           example: john.doe@mail.com
 *         password:
 *           type: string
 *           format: password
 *           example: mypassword
 *         admin:
 *           type: boolean
 *           example: false
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: A user object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
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
 *                   example: User successfully registered!
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
 *                   example: Something went wrong!
 */
router.post('/signup', usersController.register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 format: email
 *                 example: john.doe@mail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mypassword
 *     responses:
 *       200:
 *         description: Authenticated
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
 *                   example: Logged in successfully!
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqb2huLmRvZUBtYWlsLmNvbSIsImFkbWluIjpmYWxzZSwiaWF0IjoxNjA0MjY0ODIxLCJleHAiOjE2MDQzNTEyMjF9._cu1DiaIZhgIRK2_IVzHBjTsvPNgCXsl8nBtFjoy5VU
 *       401:
 *         description: Unauthorized
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
 *                   example: Email or password is wrong!
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
 *                   example: Login is required!
 */
router.post('/login', usersController.login)

module.exports = router