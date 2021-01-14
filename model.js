var validator = require('validator')
var mongoose = require('./mongoose.js')
var userSchema = new mongoose.Schema({
av: {type: Buffer},
    un: {type: String, required: true, trim: true, unique: true},
    em: {type: String, required: true, trim: true, unique: true, validate(value) {
        if (!validator.isEmail(value)) {
            return console.log('not a valid email')
        }
    } },
    pw: {type: String },  
    ns: {type: String, required: true, trim: true }
  })

var avatarSchema = new mongoose.Schema({
    av: {type: Buffer}
})

var userSession = new mongoose.Schema({
    se: {type: string}
})

var users = mongoose.model('user', userSchema)
var sess = mongoose.model('sesstion', userSession)

module.exports = users
module.exports = sess
