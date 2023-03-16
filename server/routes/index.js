const express = require('express')
const route = express()

const routeUser = require('./routeUser')
const routeJob = require('./routeJob')

route.get('/', (req, res) => { res.send('test connection')})
route.use('/users', routeUser)
route.use('/jobs', routeJob)

module.exports = route