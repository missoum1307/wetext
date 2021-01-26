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

router.get('/updateinfo', async (req, res) => {


 
var {usernameUpdate, email, password, username, sid} = req.query

modeluser
 .findOne({un: username, _id: sid })
 .then(async (data) => {
    if (modeluser.findOne({un: usernameUpdate}) ==  null && data._id !== sid) {
           modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, em: email, pw: password })
   }
  }).catch((error) => {
         console.log(error)
})
 
 



module.exports = router
