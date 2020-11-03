const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/index')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Swagger Definition

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      description: 'Ecommerce API description',
      contact: {
        name: 'Abou Bakr Gbané',
        email: 'aboubakr.gbane@gmail.com'
      },
    },
    server: {
      url: '',
      description: ''
    }
  },
  apis: ['app.js', './routes/*.js']
}

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           readOnly: true
 *           example: 4
 *         name:
 *           type: string
 *           example: Item 1
 *         photo:
 *           type: string
 *           example: https://photo.com/item1.jpeg
 *         price:
 *           type: number
 *           format: float
 *           example: 5.99
 *         description:
 *           type: string
 *           example: A random item
 *         vendor_name:
 *           type: string
 *           example: Vendor 1
 * 
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Invalid token / Missing token
 *     ForbiddenError:
 *       description: Forbidden
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             example: Operation not allowed!
 *
 *   securitySchemes:
 *     Bearer:
 *       in: header
 *       description: Enter the authentication JWT
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Authentication
 *     description: User entity related operations
 *   - name: Item
 *     description: Item entity related operations
 *   - name: Cart
 *     description: Cart entity related operations
 */

const swaggerDoc = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', function (req, res, next) {
  swaggerDoc.host = req.get('host')
  req.swaggerDoc = swaggerDoc
  next()
}, swaggerUi.serve, swaggerUi.setup())

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Sets routes
app.use(routes)

app.get('/', (request, response) => {
  response.send('I am alive!')
})

app.listen(5000)