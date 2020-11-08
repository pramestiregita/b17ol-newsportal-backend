const route = require('express').Router()
const authController = require('../controllers/auth')

route.post('/:role', authController)

module.exports = route
