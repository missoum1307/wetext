var validator = require('validator')
var mongoose = require('./mongoose.js')
var userSchema = new mongoose.Schema({
av: {type: Buffer},
    un: {type: String, required: true, trim: true, unique: true, validate(value) {
        if (!validator.isLength(value, { min: 3, max:19 })) {
            return console.log('username longer than 19 chars')
        }
    } },
    em: {type: String, required: true, trim: true, unique: true, validate(value) {
        if (!validator.isEmail(value)) {
            return console.log('not a valid email')
        }
    } },
    pw: {type: String },  
    ns: {type: String, required: true, trim: true },
    pr: {type: Array },
    sc: {type: Number, default: 0  } 
  })

var avatarSchema = new mongoose.Schema({
    av: {type: Buffer}
})

var users = mongoose.model('user', userSchema)

module.exports = users

