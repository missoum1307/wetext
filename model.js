var validator = require('validator')
var mongoose = require('./mongoose.js')
var users = mongoose.model('user', { 
    un: {type: String, required: true, trim: true },
    fn: {type: String, required: true, trim: true },
    ln: {type: String, required: true, trim: true },
    em: {type: String, required: true, trim: true, validate(value) {
        if (!validator.isEmail(value)) {
            return console.log('not a valid email')
        }
    } },
    pw: {type: String },  
    ph: {type: Number, required: true, trim: true, validate(value) {
        if (!validator.isMobilePhone) {
            return console.log('not a valid phone number')
        }
    } }  
  })

module.exports = users


