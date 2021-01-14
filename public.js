
var express = require('express')
var router = express.Router()


router.get('/public/logreg', (req, res) => {
    res.sendFile('public/logreg.html', { root : __dirname})
  })

router.get('/public/logreg', (req, res) => {
    res.sendFile('public/logreg.html', { root : __dirname})
  })

router.get('/public/logreg', (req, res) => {
    res.sendFile('public/logreg.html', { root : __dirname})
  })

module.exports = router
