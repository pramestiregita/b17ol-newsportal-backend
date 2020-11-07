const { Roles } = require('../models')
const response = require('../helpers/response')

module.exports = {
  createRole: async (req, res) => {
    try {
      const { roleName } = req.body
      const results = await Roles.create({ roleName })
      return response(res, 'Create role successfully', { data: results })
    } catch (err) {
      return response(res, 'Failed to create role', {}, 400, false)
    }
  }
}
