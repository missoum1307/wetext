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
  

        if (!validator.isLength(username, { min: 3, max:19 })) {
            return console.log('username longer than 19 chars')
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
        res.send(`<script>window.parent.postMessage('${result.un}:${result._id}:${result.em}', '*');</script>`)
      }).catch((e) => {
      console.log(e.keyValue)
         if (e.keyValue.un) {
            res.send(`<meta http-equiv="refresh" content="1; URL='https://bughunt1307.herokuapp.com/public/signup.html'"/>${e.keyValue.un} is taken`)
          } 
        if (e.keyValue.em) {
           res.send(`<meta http-equiv="refresh" content="1; URL='https://bughunt1307.herokuapp.com/public/signup.html'"/>${e.keyValue.em}  is registered`)
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

 
