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
 
router.post('/signin', /* redirecthome,*/ async (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*');
   var {email, password} = req.body

     modeluser
     .findOne({'em': email})
     .then(async (data) => {

      if (data === null) {
        return res.send(`!Email`)
      } 
      // var match = await bcrypt.compare(password, data.pw)
      if (data.em && password == data.pw) {
        res.send(`${data.un}:${data._id}:${data.em}!${data.pr}`)
      } else {
        res.send(`!Password`)
        
      }
      
     }).catch((error) => {
         console.log(error)
 
     })
 });
 module.exports = router
