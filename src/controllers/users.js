const { Users } = require('../models')
const response = require('../helpers/response')
const paging = require('../helpers/pagination')
const search = require('../helpers/searching')
const sort = require('../helpers/sorting')
const bcrypt = require('bcryptjs')
const { Op } = require('sequelize')

module.exports = {
  createUser: async (req, res) => {
    try {
      let { fullName, email, password } = req.body
      const { role } = req.params
      let roleId = 0
      if (role === 'admin') {
        roleId = 1
      } else if (role === 'user') {
        roleId = 2
      }
      if (password.length < 8) {
        return response(res, 'Password is too short (min. 8 character)')
      }
      password = await bcrypt.hash(password, await bcrypt.genSalt())
      const data = { roleId, fullName, email, password }
      const results = await Users.create(data)
      return response(res, 'Create user successfully', { data: results })
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
  getUsers: async (req, res) => {
    try {
      const { searchKey, searchValue } = search.users(req.query.search)
      const { sortKey, sortBy } = sort.users(req.query.sort)
      const count = await Users.count({
        where: {
          [searchKey]: {
            [Op.like]: `%${searchValue}%`
          }
        }
      })
      const { pageInfo, offset } = paging(req, count)
      const results = await Users.findAll({
        where: {
          [searchKey]: {
            [Op.like]: `%${searchValue}%`
          }
        },
        // includes: [
        //   { model: Roles }
        // ]
        order: [[sortKey, sortBy]],
        limit: pageInfo.limit,
        offset,
        attributes: { exclude: ['password'] }
      })
      if (results) {
        return response(res, 'Data of Users', { data: results, pageInfo })
      } else {
        return response(res, 'Data not found', {}, 404, false)
      }
    } catch (err) {
      return response(res, err.message, {}, 400, false)
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params
    const results = await Users.findByPk(id, { attributes: { exclude: ['password'] } })
    if (results) {
      return response(res, 'Detail of user', { data: results })
    } else {
      return response(res, 'User not found', {}, 400, false)
    }
  },
  updateAll: async (req, res) => {
    try {
      const { id } = req.params
      const find = await Users.findByPk(id)
      if (find) {
        const { fullName, email, oldPassword, newPassword, confrimPassword } = req.body
        if (fullName && email && oldPassword && newPassword && confrimPassword) {
          const password = find.dataValues.password
          const oldPass = await bcrypt.compare(oldPassword, password)
          if (oldPass) {
            const change = oldPassword !== newPassword
            if (change) {
              const newPass = newPassword === confrimPassword
              if (newPass) {
                const password = await bcrypt.hash(newPassword, await bcrypt.genSalt())
                const data = { fullName, email, password }
                const results = await Users.update(data, { where: { id } })
                if (results) {
                  return response(res, 'Update user successfully', { data })
                } else {
                  return response(res, 'Failed to update', {}, 400, false)
                }
              } else {
                return response(res, 'New password doesn\'t match', {}, 400, false)
              }
            } else {
              return response(res, 'Password doesn\'t change', {}, 400, false)
            }
          } else {
            return response(res, 'Your old password is wrong', {}, 400, false)
          }
        } else {
          return response(res, 'All fields must be filled', {}, 400, false)
        }
      } else {
        return response(res, 'User not found', {}, 404, false)
      }
    } catch (err) {
      if (err.errors) {
        const msg = err.errors[0].message
        return response(res, msg, {}, 400, false)
      }
      return response(res, err.message, {}, 400, false)
    }
  }
}
