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
 
var {usernameUpdate, email, password, username, sid} = req.body
     modeluser
     .findOne({'un': username, '_id': sid })
     .then(async (data) => {
      console.log(data)
      var match = await bcrypt.compare(password, data.pw)
      if (data.em && match) {
        res.send(`<script>window.parent.postMessage('${data.un}:${data._id}!${data.pr}', '*');</script>`)
      } else {
        res.send(`<meta http-equiv="refresh" content="1; URL='https://bughunt1307.herokuapp.com/public/signin.html'"/>
        Incorrect password`)
        
      }
      
     }).catch((error) => {
         console.log(error)
 
     })  
})


module.exports = router
