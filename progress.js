var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
 // const progressUpdate = await modeluser.findOne()
  

const doc = await modeluser.findOne({ _id: req.query.sid, un: req.query.username});

doc.pr.set(req.query.ps,req.query.progress)

await doc.save();

 try {
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})

router.get('/updateinfo', async (req, res) => {​
47
console.log(3, userExist)
 
var {usernameUpdate, email, password, username, sid} = req.query

let userExist = true 
let emailExit = true

modeluser
    .findOne({
        un: usernameUpdate
    })
    .then(async (data) => {
            if (data == null) {
                userExist = false
            }
        } else {
            if (data._id == sid) {
                userExist = false
            }
        }
    }).catch((error) => {
    console.log(error)
})
​
47
console.log(3, userExist)


modeluser
 .findOne({un: username, _id: sid })
 .then(async (data) => {
   
 modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, em: email, pw: password })
 
  }).catch((error) => {
         console.log('user doesnt exist')
})
 
 



module.exports = router
