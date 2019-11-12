var express = require('express')
var bodyParser = require("body-parser")
var path = require('path')
var session = require('express-session')
var validator = require('validator')
var modeluser = require('./model.js')
var mongoose = require('./mongoose.js')

const app = express();
const port = process.env.PORT || 3000
app.use(session({
    secret: 'we1307text1307together@#$%^&*()=',
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: false,
      secure: false
    }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

var redirecthome = (req, res, next) => {
  if (req.session.username){
    res.redirect('/home');
  } else {
    next()
  } 
}

app.post('/signup', async (req, res) => {
    var {username, firstname, email, lastname, password, phone} = req.body;
    try {
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
        var savetodb = new modeluser({un: username, fn: firstname, ln: lastname, em: email, pw: password, ph: phone})
        savetodb.save().then((result) => {
          req.session.username = username
          res.redirect('/home');
          console.log(result)
        }).catch((e) => {
          console.log(e)
        })
      }
    } catch (e) {
      console.log(e)
    }   
})

app.listen(port, () => {
    console.log('Listening on ' + port);
});