
var express = require('express')
var router = express.Router()


router.get('/public/logreg', (req, res) => {
    res.sendFile('public/logreg.html')
  })

router.get('/public/logreg', (req, res) => {
    res.sendFile('/public/logreg.html')
  })

router.get('/public/logreg', (req, res) => {
    res.sendFile('/public/logreg.html')
  })

module.exports = router
