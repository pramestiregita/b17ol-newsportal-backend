const route = require('express').Router()
const rolesController = require('../controllers/roles')

route.post('/', rolesController.createRole)
route.get('/', rolesController.getRoles)
route.get('/:id', rolesController.getRole)
route.patch('/:id', rolesController.updateRole)
route.delete('/:id', rolesController.deleteRole)

module.exports = route
