const route = require('express').Router()
const rolesController = require('../controllers/roles')
const userController = require('../controllers/users')

// Roles
route.post('/', rolesController.createRole)
route.get('/', rolesController.getRoles)
route.get('/:id', rolesController.getRole)
route.patch('/:id', rolesController.updateRole)
route.delete('/:id', rolesController.deleteRole)

// Users
route.post('/:role', userController.createUser)
route.get('/', userController.getUsers)
route.get('/:id', userController.getUser)
route.put('/:id', userController.updateAll)
route.patch('/:id', userController.updatePartial)
route.patch('/password/:id', userController.updatePassword)
route.delete('/:id', userController.deleteUser)

module.exports = route
