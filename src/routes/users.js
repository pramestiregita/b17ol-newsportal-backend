const route = require('express').Router()
const userController = require('../controllers/users')

route.post('/:role', userController.createUser)
route.get('/', userController.getUsers)
route.get('/:id', userController.getUser)
route.put('/:id', userController.updateAll)
route.patch('/:id', userController.updatePartial)
route.patch('/password/:id', userController.updatePassword)
route.delete('/:id', userController.deleteUser)

module.exports = route
