const route = require('express').Router()
const userController = require('../controllers/users')

route.post('/:role', userController.createUser)
route.get('/profile/', userController.getOwnUser)
route.get('/', userController.getUsers)
route.get('/:id', userController.getUser)
route.put('/', userController.updateAllUser)
route.patch('/', userController.updatePartialUser)
route.patch('/password/', userController.updatePasswordUser)
route.delete('/', userController.deleteMyAccount)

module.exports = route
