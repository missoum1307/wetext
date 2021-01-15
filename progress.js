var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  console.log(req.query)
  const progressUpdate = await modeluser.findOne({ '_id': req.body.sid })
  try {
    console.log(req.body.sid)
    console.log(progressUpdate)
    
    progressUpdate.pr = [1, 'updated']
    await progressUpdate.save()
    
    res.send(200)
  } catch (e) {
      console.log(e)
    res.send(500)
  }
})


module.exports = router
