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
 
 console.log(req.query)
 
var {usernameUpdate, email, password, username, sid} = req.query
 
 console.log(usernameUpdate, email, password, username, sid) 
     modeluser
     .findOne({'un': username, '_id': sid })
     .then(async (data) => {
      console.log(data)
      
     }).catch((error) => {
         console.log(error)
 
     })  
})


module.exports = router
