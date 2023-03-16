if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { errorHandler } = require('./middlewares/errorHandler')
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', router)

app.use(errorHandler)

// module.exports = { app }
app.listen(port, () => { console.log(`runs at: http://localhost:${port}`) })