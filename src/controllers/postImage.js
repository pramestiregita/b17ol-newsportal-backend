const { PostImage } = require('../models')
const response = require('../helpers/response')
const upload = require('../helpers/upload').array('picture')
const multer = require('multer')
const fs = require('fs')

module.exports = {
  postImage: async (req, res) => {
    upload(req, res, async (err) => {
      let picture = []
      try {
        const { id: userId } = req.user
        const { id } = req.params
        if (err instanceof multer.MulterError) {
          return response(res, err.message, {}, 500, false)
        } else if (err) {
          return response(res, err.message, {}, 500, false)
        }
        picture = req.files
        const image = picture.map(i => {
          return {
            userId,
            postId: id,
            image: 'upload/' + i.filename
          }
        })
        console.log(image)
        const results = await PostImage.bulkCreate(image)
        if (results) {
          return response(res, 'Upload image successfully', { data: results }, 201)
        } else {
          return response(res, 'Failed to upload image', {}, 400, false)
        }
      } catch (err) {
        picture.map(i => fs.unlink(i.path, (err) => {
          if (err) {
            return response(res, err.message, {}, 400, false)
          }
        }))
        return response(res, err.message, {}, 400, false)
      }
    })
  },
  getImages: async (req, res) => {

  }
}
