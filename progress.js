var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  
  console.log(modeluser)
  
  const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })

  modeluser.update({ _id: req.query.sid }, { $push: { pr: 'test1' } });
  modeluser.update({ _id: req.query.sid }, { $push: { wf: 'test5' } });
  modeluser.update({ _id: req.query.sid }, { $push: { users: 'test6' } });
  modeluser.update({ _id: req.query.sid }, { $push: { user: 'test7' } });
  try {
    modeluser.update({ _id: req.query.sid }, { $push: { pr: 'test3' } });
    // progressUpdate.pr =  req.query.progress
    await progressUpdate.save()
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})


module.exports = router
