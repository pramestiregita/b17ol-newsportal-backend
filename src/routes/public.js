const route = require('express').Router()
const userController = require('../controllers/users')

// Users
route.get('/', userController.getUsers)
route.get('/:id', userController.getUser)

module.exports = route
