const router = require('express').Router()
const authRouter = require('express').Router()
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

// Protect relevant routes
authRouter.use(auth, isAdmin)

// Item controller
const itemsController = require('../controllers/itemsController')

// Routes definition
router.get('/', itemsController.getAllItems)
router.post('/', authRouter, itemsController.addItem)
router.get('/:id', itemsController.getItem)
router.put('/:id', authRouter, itemsController.updateItem)
router.delete('/:id', authRouter, itemsController.deleteItem)

module.exports = router