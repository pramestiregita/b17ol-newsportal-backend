const route = require('express').Router()
const publicController = require('../controllers/public')

// Users
route.get('/user', publicController.getUsers)
route.get('/user/:id', publicController.getUser)

module.exports = route
