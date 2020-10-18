const router = require('express').Router()
// Defined routes
const users = require('./users')
const items = require('./items')

// Defines user endpoints
router.use('/', users)
// Defines item endpoints
router.use('/items', items)

module.exports = router