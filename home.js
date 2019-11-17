var express = require('express')
var multer  = require('multer')
var path = require('path')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var sharp = require('sharp')
var router = express.Router()

var redirectlogin = (req, res, next) => {
    if (!req.session.username) {
      res.redirect('/signin')
    } else {
      next()
    }
}

var storage = multer.memoryStorage()


var upload = multer({ storage, limits: { fileSize: 3000000}, fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('upload a valid picture'))
    }

    cb(null, true)   
  }
})

router.post('/home/upload', redirectlogin, upload.single('avatar'), async (req, res, next) => {
  const buffer = await sharp(req.file.buffer).resize({ weight: 180, height: 180 }).png().toBuffer()
  const dbavatar = await modeluser.findOne({ un: req.session.username })
  try {
    dbavatar.av = buffer
    await dbavatar.save()
    res.redirect('/home')
  } catch (e) {
      console.log(e)
  }


  res.send()
}, (error, req, res, next) => {
    console.log(error)
    res.send({error: error.message})
})

router.get('/home/profile/picture',  redirectlogin, async (req, res) => {
  const dbavatar = await modeluser.findOne({ un: req.session.username })
  res.set('Content-type', 'image/png')
  res.send(dbavatar.av)

})



router.delete('/home/profile/picture', redirectlogin, async (req, res) => {
  const dbavatar = await modeluser.findOne({ un: req.session.username })
  dbavatar.av = undefined
  try {
    await dbavatar.save()
    res.send()

  } catch (e) {
      console.log(e)
  }

})

module.exports = router