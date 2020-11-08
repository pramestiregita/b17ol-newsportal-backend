const route = require('express').Router()
const userController = require('../controllers/users')

route.post('/:role', userController.createUser)
route.get('/', userController.getUsers)

module.exports = route
