const express = require('express')
const route = express()
const Controller = require('../controllers/controllerJob')
const { authentication, authorization } = require('../middlewares/auth')

route.get('/', authentication, authorization, Controller.getJob )
route.get('/:id', authentication, authorization, Controller.getJobById )

module.exports = route