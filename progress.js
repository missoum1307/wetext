var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var router = express.Router()

router.get('/progress', async (req, res) => {
  const progressUpdate = await modeluser.findOne({ un: 'missoum1307' })
  try {
    progressUpdate.pr = [1, 'test']
    await progressUpdate.save()
    res.send(200)
  } catch (e) {
      console.log(e)
    res.send(500)
  }
})


module.exports = router
  
