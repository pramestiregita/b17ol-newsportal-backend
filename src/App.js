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
const rolesRoute = require('../src/routes/roles')
const authRoute = require('../src/routes/auth')

app.use('/user', usersRoute)
app.use('/role', rolesRoute)
app.use('/auth', authRoute)

app.listen(APP_PORT, () => {
  console.log(`App listening to port ${APP_PORT}`)
})
