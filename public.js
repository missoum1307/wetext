
var express = require('express')
var router = express.Router()


router.get('/public/logreg', (req, res) => {
    res.sendFile('public/logreg.html', { root : __dirname})
  })

router.get('/public/reg', (req, res) => {
    res.sendFile('public/signup.html', { root : __dirname})
  })

router.get('/public/log', (req, res) => {
    res.sendFile('public/signin.html', { root : __dirname})
  })

module.exports = router
