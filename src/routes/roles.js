const route = require('express').Router()
const rolesController = require('../controllers/roles')

route.post('/', rolesController.createRole)

module.exports = route
