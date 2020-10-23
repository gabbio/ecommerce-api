const router = require('express').Router()
// Defined routes
const users = require('./users')
const items = require('./items')
const carts = require('./carts')

// Defines user endpoints
router.use('/', users)
// Defines item endpoints
router.use('/items', items)
// Defines cart endpoints
router.use('/cart', carts)

module.exports = router