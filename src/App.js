const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const { APP_PORT } = process.env

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

const { authUser, authAdmin } = require('../src/middleware/auth')
const usersRoute = require('../src/routes/user')
const adminRoute = require('../src/routes/admin')
const authRoute = require('../src/routes/auth')
const publicRoute = require('../src/routes/public')

app.use('/user', authUser, usersRoute)
app.use('/admin', authAdmin, adminRoute)
app.use('/auth', authRoute)
app.use('/public', publicRoute)

// provide static files
app.use('/upload', express.static('assets/uploads/'))

app.listen(APP_PORT, () => {
  console.log(`App listening to port ${APP_PORT}`)
})
