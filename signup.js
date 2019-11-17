var express = require('express')
var modeluser = require('./model.js')
var path = require('path')
var bcrypt = require('bcryptjs')
var sendemail = require('./sendemail.js')
var router = express.Router()

var redirecthome = (req, res, next) => {
  if (req.session.username){
    res.redirect('/home');
  } else {
    next()
  }     
}

router.post('/signup', async (req, res) => {
  var {username, firstname, email, lastname, password, phone} = req.body
  try {
    var hashpasswed = await bcrypt.hash(password, 8)
    var savetodb = new modeluser({
      un: username, 
      fn: firstname, 
      ln: lastname, 
      em: email, 
      pw: hashpasswed, 
      ph: phone
    })
    
    savetodb.save().then((result) => {
        req.session.username = username
        res.redirect('/home')
      }).catch((e) => {
        res.status(400).send(e)
      })
    sendemail(req.body.email, req.body.firstname)

    
  } catch (e) {
    console.log(e)
  }   
})

router.get('/signup', redirecthome, (req, res, next) => {
   
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router

 