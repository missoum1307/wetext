var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  
  console.log(modeluser)
  
  const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username }).update({ _id:  }, { $push: { pr: 'test1' } });

  modeluser.user.update({ _id:  }, { $push: { pr: 'test1' } });

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
