const { comparePassword } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/tokenGenerator')
const { User } = require('../models/index')

class Controller {
  static async register(req, res, next) {
    try {
      console.log(req.body)
      const { username, password } = req.body
      const createdUser = await User.create({ username, password })
      let data = {username: createdUser.username} 
      res.status(201).json({message:'New record has been created', data })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      // console.log(req.body)
      const { username, password } = req.body
      if (!username || !password){
        throw { name: 'UsernameOrPasswordRequired' }
      }
      const data = await User.findOne({ where: { username} })
      if (!data) {
        throw { name: 'InvalidCredentials' }
      }
      let isMatched = comparePassword(password, data.password)
      if (!isMatched){
        throw { name: 'InvalidCredentials' }
      }

      let payload = {
        username: data.username,
      }

      let access_token = tokenGenerator(payload)
      res.status(200).json({message:'Logged In Successfully', data:{ access_token, username: data.username }})

    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller