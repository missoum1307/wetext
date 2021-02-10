var express = require('express')
var modeluser = require('./model.js')
var path = require('path')
var bcrypt = require('bcryptjs')
var sendemail = require('./sendemail.js')
var router = express.Router()
var validator = require('validator')

var redirecthome = (req, res, next) => {
  if (req.session.username){
    res.redirect('/home');
  } else {
    next()
  }     
}

router.post('/signup',  async (req, res) => {
  var {username, email, password, native} = req.body
  

        if (!validator.isLength(username, { min: 1, max:19 })) {
             res.send(`!>Username`)
        }


  try {
    var hashpasswed = await bcrypt.hash(password, 8)
    var savetodb = new modeluser({
      un: username,
      em: email, 
      pw: hashpasswed, 
      ns: native,
      pr: 'zoro,0',
      sc: 0
    })

    
    savetodb.save().then((result) => {
        req.session.username = username
        res.send(`${result.un}:${result._id}:${result.em}`)
      }).catch((e) => {
      console.log(e.keyValue)
         if (e.keyValue.un) {
            res.send(`!${e.keyValue.un}`)
          } 
        if (e.keyValue.em) {
           res.send(`!${e.keyValue.em}`)
         } 
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

 
