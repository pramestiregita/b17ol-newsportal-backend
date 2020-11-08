const route = require('express').Router()
const userController = require('../controllers/users')
const postController = require('../controllers/post')

// users
route.get('/profile', userController.getOwnUser)
route.get('/user', userController.getUsers)
route.get('/user/:id', userController.getUser)
route.put('/profile', userController.updateAllUser)
route.patch('/profile', userController.updatePartialUser)
route.patch('/profile/password/', userController.updatePasswordUser)
route.delete('profile/', userController.deleteMyAccount)

// post
route.post('/post', postController.createPost)
route.get('/post', postController.getPosts)
route.get('/post/:id', postController.getPost)
route.get('/post/author/:id', postController.getAuthorPosts)
route.get('/post/author/:userId/:id', postController.getAuthorPost)

module.exports = route
