const { UserImages } = require('../models')
const upload = require('../helpers/upload').single('picture')
const response = require('../helpers/response')
const multer = require('multer')
const fs = require('fs')

module.exports = {
  uploadImage: async (req, res) => {
    upload(req, res, async (err) => {
      let picture = {}
      try {
        const { id: userId } = req.user
        if (err instanceof multer.MulterError) {
          return response(res, err.message, {}, 500, false)
        } else if (err) {
          return response(res, err.message, {}, 500, false)
        }
        if (req.file === undefined) {
          return response(res, 'Please select an image', {}, 400, false)
        } else {
          picture = req.file
        }
        const image = {
          userId,
          image: 'upload/' + picture.filename
        }
        const results = await UserImages.create(image)
        if (results) {
          return response(res, 'Upload image successfully', { data: results }, 201)
        } else {
          return response(res, 'Failed to upload image', {}, 400, false)
        }
      } catch (err) {
        picture && fs.unlink(picture.path, (err) => {
          if (err) {
            return response(res, err.message, {}, 400, false)
          }
        })
        return response(res, err.message, {}, 400, false)
      }
    })
  },
  updateImage: async (req, res) => {
    upload(req, res, async (err) => {
      let picture = {}
      try {
        const { id: userId } = req.user
        if (err instanceof multer.MulterError) {
          return response(res, err.message, {}, 500, false)
        } else if (err) {
          return response(res, err.message, {}, 500, false)
        }
        if (req.file === undefined) {
          return response(res, 'Please select an image', {}, 400, false)
        } else {
          picture = req.file
        }
        const image = {
          image: 'upload/' + picture.filename
        }
        const results = await UserImages.update(image, { where: { userId } })
        if (results) {
          return response(res, 'Upload image successfully', { data: image }, 201)
        } else {
          return response(res, 'Failed to upload image', {}, 400, false)
        }
      } catch (err) {
        picture && fs.unlink(picture.path, (err) => {
          if (err) {
            return response(res, err.message, {}, 400, false)
          }
        })
        return response(res, err.message, {}, 400, false)
      }
    })
  }
}
