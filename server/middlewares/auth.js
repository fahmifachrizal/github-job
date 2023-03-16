const { tokenDecoder } = require("../helpers/tokenGenerator")
const { User, Food } = require("../models/index")

const authentication = async (req, res, next) => {
  try {
    let access_token = req.headers.access_token
    if (!access_token) { next({name: 'Unauthenticated'}) } 
    
    payload = tokenDecoder(access_token)
    const data = await User.findOne({ where: { username : payload.username }})

    if (!data) { { next({name: 'Unauthenticated'}) } }

    req.user = {
      username: payload.username
    }
    next()
  } catch(error) {
    next(error)
  }
}

const authorization = async (req, res, next) => {
    try{
        const username = req.user.username
        if (!username){
          throw {name: 'Forbidden'}
        } else {
          next()
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication, authorization }