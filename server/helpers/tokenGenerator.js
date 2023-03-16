const jwt = require('jsonwebtoken')
const secret = process.env.TOKEN_SECRET

const tokenGenerator = (payload) => jwt.sign(payload, secret)
const tokenDecoder = (token) => jwt.verify(token, secret)

module.exports = { tokenGenerator, tokenDecoder }