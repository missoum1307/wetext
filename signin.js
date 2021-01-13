var express = require('express')
var modeluser = require('./model.js')
var path = require('path')
var router = express.Router()
var bcrypt = require('bcryptjs')


var redirecthome = (req, res, next) => {
    if (req.session.username){
      res.redirect('/home');
    } else {
      next()
    }     
  }

router.get('/signin', redirecthome, (req, res) => {
      
    res.sendFile(path.join(__dirname + '/index.html'));
 });
 
router.post('/signin', /*redirecthome*/ async (req, res) => {
   var {email, password} = req.body
     modeluser
     .findOne({'em': email})
     .then(async (data) => {
      if (data === null) {
        return res.send(`<meta http-equiv="refresh" content="1; URL='https://bughunt1307.herokuapp.com/public/signin.html'"/>
         Email is not registred`)
      } 
      var match = await bcrypt.compare(password, data.pw)
      if (data.em && match) {
        req.session.username = data.un
        res.send(`<script>window.parent.postMessage(${data.un} + ':', '*');</script>`)
      } else {
        res.send(`<meta http-equiv="refresh" content="1; URL='https://bughunt1307.herokuapp.com/public/signin.html'"/>
        Incorrect password`)
        
      }
      
     }).catch((error) => {
         console.log(error)
 
     })
 });

 module.exports = router
