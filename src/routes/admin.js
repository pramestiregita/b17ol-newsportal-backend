const route = require('express').Router()
const rolesController = require('../controllers/roles')
const userController = require('../controllers/users')

// Roles
route.post('/role', rolesController.createRole)
route.get('/role', rolesController.getRoles)
route.get('/role/:id', rolesController.getRole)
route.patch('/role/:id', rolesController.updateRole)
route.delete('/role/:id', rolesController.deleteRole)

// Users
route.post('/user/:role', userController.createUser)
route.get('/user', userController.getUsers)
route.get('/user/:id', userController.getUser)
route.put('/user/:id', userController.updateAll)
route.patch('/user/:id', userController.updatePartial)
route.patch('/user/password/:id', userController.updatePassword)
route.delete('/user/:id', userController.deleteUser)

module.exports = route
