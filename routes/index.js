const router = require('express').Router()
// Defined routes
const items = require('./items')

// Defines item endpoints
router.use('/items', items)

module.exports = router