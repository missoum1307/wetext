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
  
     res.send(`hello ${req.session.username} <br>
      <img src="/home/profile/picture">
      <form action="/home/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="avatar" />
      <input type="submit" id="upload" name="upload" value="upload"/>
      </form>

      <form method="post" action="/home/profile/picture?_method=DELETE">
      <input type="hidden" name="_method" value="DELETE">
      <input type="submit" name="DELETE" value="DELETE"/>
      </form>

      </br>
      <form action="/signout" method="post">
      <input type="submit" id="submitDetails" name="submitDetails" value="sign-out"/><br> </form>` 
    )
})
  
  
  
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
