const router = require('express').Router()

// Item controller
const itemsController = require('../controllers/itemsController')

// Routes definition
router.get('/', itemsController.getAllItems)

module.exports = router