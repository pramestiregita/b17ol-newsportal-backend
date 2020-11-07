const route = require('express').Router()
const rolesController = require('../controllers/roles')

route.post('/', rolesController.createRole)
route.get('/', rolesController.getRoles)

module.exports = route
