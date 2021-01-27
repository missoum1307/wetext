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

let userExist = true 
let emailExit = true
var hashpasswed = await bcrypt.hash(password, 8)

modeluser
    .findOne({
        un: usernameUpdate
    })
    .then(async (data) => {
           if (data == null) {
            modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
           } else {
            if (data._id == sid) {
            modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
                }
           }
    })

 
console.log(userExist)
modeluser
 .findOne({un: username, _id: sid })
 .then(async (data) => {
   
 modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, em: email, pw: password })
 
  }).catch((error) => {
         console.log('user doesnt exist')
})
})



module.exports = router
