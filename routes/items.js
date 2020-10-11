const router = require('express').Router()

// Item controller
const itemsController = require('../controllers/itemsController')

// Routes definition
router.get('/', itemsController.getAllItems)
router.post('/', itemsController.addItem)
router.get('/:id', itemsController.getItem)
router.put('/:id', itemsController.updateItem)

module.exports = router