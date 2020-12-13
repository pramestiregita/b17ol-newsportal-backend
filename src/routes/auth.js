const route = require('express').Router()
const authController = require('../controllers/auth')
const userController = require('../controllers/users')
const rolesController = require('../controllers/roles')

// login
route.post('/login/:role', authController)

// register user
route.post('/signup/:role', userController.registerUser)

route.post('/role', rolesController.createRole)
route.post('/user/:role', userController.createUser)

module.exports = route
