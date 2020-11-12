const route = require('express').Router()
const authController = require('../controllers/auth')
const userController = require('../controllers/users')

// login
route.post('/login/:role', authController)

// register user
route.post('/signup/:role', userController.registerUser)

module.exports = route
