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

        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
          if (err) {
            return console.log(err)
          }
          var db = client.db(dbname)
             db
         .collection('users')
         .findOne({'em': email}, {em:1, pw:1, un:1, ph:1, _id:0})
         .then(function(emailrecord) {
            
            if (emailrecord === undefined) {
                db
                .collection('users')
                .findOne({'un': username}, {em:1, pw:1, un:1, ph:1, _id:0})
                .then(function(usernamerecord){
      
                  if (usernamerecord === undefined){
      
                     db
                    .collection('users')
                    .findOne({'ph': phone}, {em:1, pw:1, un:1, ph:1, _id:0})
                    .then(function(phonerecord){
                      if (phonerecord ===  undefined){
      
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
        })   

});