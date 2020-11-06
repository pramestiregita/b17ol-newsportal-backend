const { Users } = require('../models')
const response = require('../helpers/response')
const bcrypt = require('bcryptjs')

module.exports = {
  createUser: async (req, res) => {
    try {
      let { fullName, email, password } = req.body
      if (password.length < 8) {
        return response(res, 'Password is too short (min. 8 character)')
      }
      password = await bcrypt.hash(password, await bcrypt.genSalt())
      const data = { fullName, email, password }
      const results = await Users.create(data)
      return response(res, 'Create user successfully', { data: results })
    } catch (err) {
      if (err.message.includes('\n')) {
        return response(res, 'All fields must be filled', {}, 400, false)
      } else if (err.message.includes('notNull')) {
        const msg = err.message.slice(19)
        return response(res, msg, {}, 400, false)
      } else if (err.errors[0].message) {
        const msg = err.errors[0].message
        return response(res, msg, {}, 400, false)
      } else {
        return response(res, 'Unexpected error', {}, 400, false)
      }
    }
  }
}
