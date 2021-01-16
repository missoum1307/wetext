var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  
  console.log(modeluser)
  
  modeluser.update({ _id: req.query.sid}, { $set: { pr: 'jason bourne' }})

  const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })
/*
  Model.findOne({ name: 'bourne' }, function (err, doc){
  doc.name = 'jason bourne';
  doc.visits.$inc();
  doc.save();
});
  
  */

  try {
    //progressUpdate.pr =  { $push: { pr: 'test3' } } //req.query.progress
    await progressUpdate.save()
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})


module.exports = router
