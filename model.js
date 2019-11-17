var validator = require('validator')
var mongoose = require('./mongoose.js')

var userSchema = new mongoose.Schema({
av: {type: Buffer},
    un: {type: String, required: true, trim: true, unique: true},
    fn: {type: String, required: true, trim: true },
    ln: {type: String, required: true, trim: true },
    em: {type: String, required: true, trim: true, unique: true, validate(value) {
        if (!validator.isEmail(value)) {
            return console.log('not a valid email')
        }
    } },
    pw: {type: String },  
    ph: {type: Number, required: true, trim: true, unique: true, validate(value) {
        if (!validator.isMobilePhone) {
            return console.log('not a valid phone number')
        }
    } }  
  })

var avatarSchema = new mongoose.Schema({
    av: {type: Buffer}
})
var users = mongoose.model('user', userSchema)

module.exports = users


