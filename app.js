var express = require('express')
var bodyParser = require("body-parser")
var session = require('express-session')
var validator = require('validator')
var modeluser = require('./model.js')
var mongoose = require('./mongoose.js')
var routerUp = require('./signup.js')
var routerIn = require('./signin.js')
var routerNotLogged = require('./notlogged.js')
var routerHome = require('./home.js')

const app = express()
const port = process.env.PORT
const db = mongoose.db

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(session({
  secret: process.env.session_secret,
  name: 'sid',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: false,
    secure: false
  }
}))

app.use(routerUp)
app.use(routerIn)
app.use(routerNotLogged)
app.use(routerHome)
app.use(express.static(__dirname + 'public')); //Serves resources from public folder

app.listen(port, () => {
    console.log('Listening on ' + port)
})
