const express = require('express')
const route = express()
const Controller = require('../controllers/controllerUser')

route.post('/register', Controller.register )
route.post('/login', Controller.login )

module.exports = route