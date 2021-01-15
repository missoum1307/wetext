var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  console.log(req.query)
  const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })
  console.log(progressUpdate.pr)
  try {
    progressUpdate.pr = req.query.progress
    await progressUpdate.save()
    res.send(200)
  } catch (e) {
    console.log(e)
    res.send(500)
  } 
11
    
})


module.exports = router