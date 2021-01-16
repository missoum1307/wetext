var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
 // const progressUpdate = await modeluser.findOne()
  

const doc = await modeluser.findOne({ _id: req.query.sid });

doc.pr.push({
  $each: [1, 2, 3],
  $position: 0
});

await doc.save();

console.log(doc.pr); // [1, 2, 3, 4, 5]
  try {
    //progressUpdate.pr =  { $push: { pr: 'test3' } } //req.query.progress
    // await progressUpdate.save()
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})


module.exports = router
