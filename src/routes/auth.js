const route = require('express').Router()
const authController = require('../controllers/auth')
const userController = require('../controllers/users')

// login
route.post('/:role', authController)

// register user
route.post('/user', userController.createUser)

module.exports = route
