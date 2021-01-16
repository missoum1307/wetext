var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  
  
  const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })
  progressUpdate.update({ _id: req.query.sid }, { $push: { 'test': 'test' } }, done);
  
  try {
    
    progressUpdate.pr =  [req.query.progress]
    await progressUpdate.save()
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})


module.exports = router
