const router = require('express').Router()

// User controller
const usersController = require('../controllers/usersController')

// Routes definition
router.post('/signup', usersController.register)
router.post('/login', usersController.login)

module.exports = router