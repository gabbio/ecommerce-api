const router = require('express').Router()
const auth = require('../middlewares/auth')

// Requires authentication for all the routes
router.use(auth)

// Item controller
const cartsController = require('../controllers/cartsController')

// Routes definition
router.post('/add', cartsController.addItems)
router.get('/', cartsController.getCart)
router.delete('/:id', cartsController.deleteItem)

module.exports = router