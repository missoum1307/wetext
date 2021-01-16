var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
 // const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })
  
  modeluser.findOne({ _id: '6001d1b20c1a7c00179e6264'}, function (err, doc){
    doc.pr = 'jason bourne'
    doc.save()
  })
  
  modeluser.findOneAndUpdate(
   { _id: '5fff4e1f1d2dbd001738a9be' }, 
   { $push: { pr: [1,2,'test']  } },
  function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
)
  
/*
  Model.findOne({ name: 'bourne' }, function (err, doc){
  doc.name = 'jason bourne';
  doc.visits.$inc();
  doc.save();
});
  
  */

  try {
    //progressUpdate.pr =  { $push: { pr: 'test3' } } //req.query.progress
    // await progressUpdate.save()
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})


module.exports = router
