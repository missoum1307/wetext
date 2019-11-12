var express = require('express')
var modeluser = require('./model.js')
var path = require('path')
var bcrypt = require('bcryptjs')
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
    const emcheck = await modeluser.findOne({'em': email})
    const uncheck = await modeluser.findOne({'un': username})
    const phcheck = await modeluser.findOne({'ph': phone})
    if (emcheck !== null) {
      res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                      email already registred `);
    } else if (uncheck !== null) {
      res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                      username already registred `);
    } else if (phcheck !== null) {
      res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                      phone already registred `);
    } else {
      var savetodb = new modeluser({un: username, fn: firstname, ln: lastname, em: email, pw: hashpasswed, ph: phone})
      savetodb.save().then((result) => {
        req.session.username = username
        res.redirect('/home');
      }).catch((e) => {
        console.log(e)
      })
    }
  } catch (e) {
    console.log(e)
  }   
})

router.get('/signup', redirecthome, (req, res, next) => {
   
  res.sendFile(path.join(__dirname + '/index.html'));
});

module.exports = router

 