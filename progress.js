var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var bcrypt = require('bcryptjs')
var router = express.Router()

router.get('/progress', async (req, res) => {
const doc = await modeluser.findOne({ _id: req.query.sid, un: req.query.username});

doc.pr.set(req.query.ps,req.query.progress)

await doc.save();

 try {
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})

router.get('/updateinfo', async (req, res) => {

 
var {usernameUpdate, email, password, username, sid} = req.query

var hashpasswed = await bcrypt.hash(password, 8)

try {
 modeluser
    .findOne({
        un: usernameUpdate
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
           } else {
            if (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
                }
           }
    })
} catch (error) {
 
 console.log(error)

}
 
try {
	modeluser
    .findOne({
        em: email
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { em: email, pw: hashpasswed })
           } else {
            if (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { em: email, pw: hashpasswed })
                }
           }
    })
} catch (error) {
	console.log(error)
}
 
  

 
 
 
 
})





module.exports = router
