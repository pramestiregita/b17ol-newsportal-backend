const { Roles } = require('../models')
const response = require('../helpers/response')
const pagination = require('../helpers/pagination')
const { Op } = require('sequelize')

module.exports = {
  createRole: async (req, res) => {
    try {
      const { roleName } = req.body
      const results = await Roles.create({ roleName })
      return response(res, 'Create role successfully', { data: results })
    } catch (err) {
      return response(res, 'Failed to create role', {}, 400, false)
    }
  },
  getRoles: async (req, res) => {
    try {
      const { search = '' } = req.query
      const count = await Roles.count()
      const { pageInfo, offset } = pagination(req, count)
      const results = await Roles.findAll({
        where: {
          roleName: {
            [Op.like]: `%${search}%`
          }
        },
        limit: pageInfo.limit,
        offset
      })
      if (results.length) {
        return response(res, 'Data of roles', { data: results, pageInfo })
      } else {
        return response(res, 'Data not found', {}, 404, false)
      }
    } catch (err) {
      return response(res, err.message, {}, 400, false)
    }
  },
  getRole: async (req, res) => {
    try {
      const { id } = req.params
      const results = await Roles.findByPk(id)
      if (results) {
        return response(res, `Data of role id ${id}`, { data: results })
      } else {
        return response(res, 'Data not found', {}, 404, false)
      }
    } catch (err) {
      return response(res, err.message, {}, 400, false)
    }
  }
}
