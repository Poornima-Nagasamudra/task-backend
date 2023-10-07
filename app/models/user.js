const mongoose = require('mongoose')
const isEmail  = require('validator/lib/isEmail')
const uniqueValidator = require("mongoose-unique-validator")
const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
const bcryptjs = require('bcryptjs')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        minlength: 4,
        maxlength: 70
    },
    email:{
        type: String,
        required:[true, 'email is required'],
        unique: true,
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message: function(){
                return 'invalid email'
            }
        }
    },
    password: {
        type: String,
        required: [true, 'required password'],
        unique: true,
        minlength: 8,
        maxlength: 128,
        validate: {
            validator: function (value) {
              return passwordFormat.test(value);
            },
            message: function () {
              return "Password must Contain Minimum 8 characters, at least 1 letter, 1 number and one special character";
            },
          },
    },
    registrationDate : {
        type: Date
    }
    
}, {timestamps:true})

userSchema.plugin(uniqueValidator)

userSchema.pre("save", function (next) {
    const user = this
    bcryptjs.genSalt()
      .then((salt) => {
        console.log(salt)
         bcryptjs.hash(user.password, salt)
           .then((encrypted) => {
               user.password = encrypted
               next()
            })
       })
})

const User = mongoose.model('User', userSchema)

module.exports = User


