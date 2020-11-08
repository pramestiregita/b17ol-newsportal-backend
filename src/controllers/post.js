const { Post, Users } = require('../models')
const response = require('../helpers/response')
const Joi = require('joi')
const search = require('../helpers/searching')
const sort = require('../helpers/sorting')
const paging = require('../helpers/pagination')
const { Op } = require('sequelize')

module.exports = {
  createPost: async (req, res) => {
    try {
      const { id: userId } = req.user
      const schema = Joi.object({
        title: Joi.string().messages({
          'string.empty': 'Title can\'t be empty'
        }),
        news: Joi.string().messages({
          'string.empty': 'Post can\'t be empty'
        })
      })
      const find = await Users.findByPk(userId)
      if (find) {
        const { value, error } = schema.validate(req.body)
        if (error) {
          return response(res, error.message, {}, 400, false)
        }
        const { title, news } = value
        const data = { userId, title, news }
        const results = await Post.create(data)
        if (results) {
          return response(res, 'Create post successfully', { data: results }, 201)
        } else {
          return response(res, 'Failed to create', {}, 400, false)
        }
      } else {
        return response(res, 'User not found', {}, 404, false)
      }
    } catch (err) {
      if (err.message.includes('\n')) {
        return response(res, 'All fields must be filled', {}, 400, false)
      } else if (err.message.includes('notNull')) {
        const msg = err.message.slice(19)
        return response(res, msg, {}, 400, false)
      } else if (err.errors) {
        const msg = err.errors[0].message
        return response(res, msg, {}, 400, false)
      } else {
        return response(res, err.message, {}, 400, false)
      }
    }
  },
  getPosts: async (req, res) => {
    try {
      const { searchKey, searchValue } = search.post(req.query.search)
      const { sortKey, sortBy } = sort.post(req.query.sort)
      const count = await Post.count({
        where: {
          [searchKey]: {
            [Op.like]: `%${searchValue}%`
          }
        },
        order: [[sortKey, sortBy]]
      })
      const { pageInfo, offset } = paging(req, count)
      const results = await Post.findAll({
        where: {
          [searchKey]: {
            [Op.like]: `%${searchValue}%`
          }
        },
        order: [[sortKey, sortBy]],
        limit: pageInfo.limit,
        offset
      })
      if (results) {
        return response(res, 'List of News', { data: results, pageInfo })
      } else {
        return response(res, 'News not found', {}, 404, false)
      }
    } catch (err) {
      return response(res, err.message, {}, 400, false)
    }
  }
}