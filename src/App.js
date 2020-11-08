const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

const usersRoute = require('../src/routes/users')
const adminRoute = require('../src/routes/admin')
const authRoute = require('../src/routes/auth')
const publicRoute = require('../src/routes/public')

app.use('/user', usersRoute)
app.use('/admin', adminRoute)
app.use('/auth', authRoute)
app.use('/public', publicRoute)

app.listen(APP_PORT, () => {
  console.log(`App listening to port ${APP_PORT}`)
})
