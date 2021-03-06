const route = require('express').Router()
const userController = require('../controllers/users')
const userImageController = require('../controllers/userImage')
const postController = require('../controllers/post')
const postImageController = require('../controllers/postImage')

// users
route.get('/profile', userController.getOwnUser)
route.get('/users', userController.getUsers)
route.get('/users/:id', userController.getUser)
route.put('/profile', userController.updateAllUser)
route.patch('/profile', userController.updatePartialUser)
route.patch('/profile/password/', userController.updatePasswordUser)
route.delete('/profile/', userController.deleteMyAccount)
route.post('/profile/image', userImageController.uploadImage)
route.patch('/profile/image', userImageController.updateImage)

// post
route.post('/post', postController.createPost)
route.get('/post', postController.getPosts)
route.get('/post/:id', postController.getPost)
route.get('/post/author/:id', postController.getAuthorPosts)
route.get('/post/author/:userId/:id', postController.getAuthorPost)
route.get('/my-post', postController.getOwnPosts)
route.get('/my-post/:id', postController.getOwnPost)
route.put('/my-post/:id', postController.updateOwnAll)
route.patch('/my-post/:id', postController.updateOwnPartial)
route.delete('/my-post/:id', postController.deleteOwnPost)

// PostImage
route.post('/post/picture/:id', postImageController.postImage)
route.patch('/post/picture/:id', postImageController.editImage)
route.get('/my-post/picture', postImageController.getOwnImages)
route.get('/my-post/picture/:id', postImageController.getOwnImage)

module.exports = route
