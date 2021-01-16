var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
 // const progressUpdate = await modeluser.findOne({ _id: req.query.sid, un: req.query.username })
  

const doc = await modeluser.findOne({ _id: '6001d1b20c1a7c00179e6264'});
 console.log(doc);
doc.pr.push(5); // Add 5 to the end of the arr
 console.log(doc.pr);
await doc.save();

// You can also pass an object with `$each` as the
// first parameter to use MongoDB's `$position`
doc.pr.push({
  $each: [1, 3],
  $position: 0
});
console.log(doc.pr); // [1, 2, 3, 4, 5]
  
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
