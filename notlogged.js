var express = require('express')
var router = express.Router()

var redirectlogin = (req, res, next) => {
    if (!req.session.username) {
      res.redirect('/signin')
    } else {
      next()
    }
  }
  
  router.get('/', (req, res) => {
    (!req.session.username) ? res.redirect('/signin') : res.redirect('/home')
  });
  
  router.get('/home', redirectlogin, (req, res) => {
  
     res.send(`hello ${req.session.username} <br><form action="/signout" method="post">
              <input type="submit" id="submitDetails"
              name="submitDetails" value="sign-out"/><br>
          </form>`);
  
    });
  
  
  
    router.post('/signout', redirectlogin, (req, res) => {
  
     req.session.destroy(err => {
      if (err){
        return res.redirect('/home')
      }
      res.clearCookie('sid')
      res.redirect('/signin')
     })
  })
  
module.exports = router
