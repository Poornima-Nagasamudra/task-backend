const User = require('../models/user')
const bcryptjs  = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {}

userController.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json({ user, success : true, message: ' Register successfully'})
        })
        .catch((err) => {
            res.json(err)
        })
}

userController.login = (req, res) => {
    const body = req.body
    User.findOne ({ email : body.email})
       .then((user)=> {
           if(!user){
               res.json({errors: 'invalid email or password'})
           } else {
              bcryptjs.compare(body.password, user.password)
                 .then((match)=> {
                      if(match){
                          const tokenData = {
                             _id: user._id,
                             username: user.username,
                             email: user.email
                          }
                          const token = jwt.sign(tokenData,  'dct@123', {expiresIn : '1d' })
                          res.json({ token : `Bearer ${token}`, tokenName : 'auth token', message: 'Logged In' })
                      } else {
                         res.json({ errors: 'invalid email or password'})
                      }
                 })
           }
           
       })
}

userController.account = (req, res) => {
    res.json(req.user)   
}

module.exports = userController