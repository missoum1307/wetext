var express = require('express');
var app = express();
var bodyParser=require("body-parser");
var path = require('path');
var session = require('express-session');

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
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000

// create db and open connection and check if it is opened.
 var MongoClient = require('mongodb').MongoClient
//var url = 'mongodb://127.0.0.1:27017/wetext'
var url = process.env.MONGOLAB_URI
var dbname = 'heroku_rms5ss0s'

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
  if (err) {
    return console.log(err)
  }
  client.db(dbname)
})
/*
var mongoose = require('mongoose')
var url = 'mongodb://127.0.0.1:27017/wetext'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', (err)=> {
   console.log(err);
});
db.once('open', () => {
   console.log('Connection opened on:', url);
});

*/

var redirectlogin = (req, res, next) => {
  if (!req.session.username){
    res.redirect('/signin');
  }else {
    next()
  }

}

var redirecthome = (req, res, next) => {
  if (req.session.username){
    res.redirect('/home');
  }else {
    next()
  }

}

// sending default page index.html
app.get('/', (req, res) => {
  (!req.session.username) ? res.redirect('/signin') : res.redirect('/home')
});

app.get('/home', redirectlogin, (req, res) => {

   res.send(`hello ${req.session.username} <br><form action="/signout" method="post">
            <input type="submit" id="submitDetails"
            name="submitDetails" value="sign-out"/><br>
        </form>`);


   
   // res.sendFile(path.join(__dirname + '/signin.html'));
});


app.get('/signin', redirecthome, (req, res) => {

   res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/signup', redirecthome, (req, res, next) => {
   
    res.sendFile(path.join(__dirname + '/index.html'));
});


// signup page and inserting new user
app.post('/signup', redirecthome, (req, res) => {
    var {username, firstname, lastname, email, password, phone} = req.body;
    var data = {
        'un': username,
        'fn': firstname,
        'ln': lastname,
        'em': email,
        'pw': password,
        'ph': phone
        };

   db
   .collection('users')
   .find({'em': email}, {em:1, pw:1, un:1, ph:1, _id:0})
   .toArray()
   .then(function(emailrecord) {
      
      if (emailrecord[0] === undefined) {
          db
          .collection('users')
          .find({'un': username}, {em:1, pw:1, un:1, ph:1, _id:0})
          .toArray()
          .then(function(usernamerecord){

            if (usernamerecord[0] === undefined){

               db
              .collection('users')
              .find({'ph': phone}, {em:1, pw:1, un:1, ph:1, _id:0})
              .toArray()
              .then(function(phonerecord){
                if (phonerecord[0] ===  undefined){

                     db.collection('users').insertOne(data,function(err, collection){
                           if (err) throw err;
                          console.log('record inserted' + JSON.stringify(data));
                          req.session.username = username
                          res.redirect('/home');
                          
              
                      });

                } else {
                  res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                           phone already registred`);
                }

               })



            }else {

              res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                        username already registred`);
            }

          });
        
      } else {
         res.send(`<meta http-equiv="refresh" content="2;url=/signin" />
                  email already registred `);
      }
      
   });

});

// login, check if email exists then compares it with password to log in.
app.post('/signin', redirecthome, (req, res) => {
  //  var {email, password} = req.body;
   const email = req.body.email
   const password = req.body.password
   MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    if (err) {
      return console.log(err)
    }
    var db = client.db(dbname)
    db
    .collection('users')
    .find({'em': email}, {em:1, pw:1, un:1, _id:0})
    .toArray()
    .then((data) => {
     if (data.length === 0) {
       res.send(`<meta http-equiv="refresh" content="2; URL='/signin'"/>
        email doesnt exist`)
     } else if (data[0].em && password === data[0].pw) {
       req.session.username = data[0].un
       res.redirect('/home')
     } else {
       res.send(`<meta http-equiv="refresh" content="2; URL='/signin'"/>
       incorrect password`)
       
     }
     
    })
  })


});




app.post('/signout', redirectlogin, (req, res) => {

   req.session.destroy(err => {
    if (err){
      return res.redirect('/home')
    }
    res.clearCookie('sid');
    res.redirect('/signin')
   })
});

app.listen(port, () => {
    console.log('Listening on ' + port);
});