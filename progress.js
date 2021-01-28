var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var bcrypt = require('bcryptjs')
var router = express.Router()

router.get('/progress', async (req, res) => {
const doc = await modeluser.findOne({ _id: req.query.sid, un: req.query.username});

doc.pr.set(req.query.ps,req.query.progress)

await doc.save();

 try {
    res.send(200)
  } catch (e) {
    res.send(500)
  }   
})

router.get('/updateinfo', async (req, res) => {

 
var {usernameUpdate, email, password, username, sid} = req.query

var hashpasswed = await bcrypt.hash(password, 8)
let arrayInfo = {}



try {
 modeluser
    .findOne({
        un: usernameUpdate
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
		   arrayInfo[0] = usernameUpdate
		
           } else {
            if (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
			arrayInfo[0] = usernameUpdate
		 
                }
           }
    })
} catch (error) {
	arrayInfo[0] = 'Username is taken!'
 console.error(error);
}


try {
  modeluser
    .findOne({
        em: email
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { em: email, pw: hashpasswed })
		   arrayInfo[1] = email
		
           } else {
            if (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { em: email, pw: hashpasswed })
		    arrayInfo[1] = email	
		    
                }
           }
    })
} catch (error) {
	arrayInfo[1] = 'email is taken'
  console.error(error);

}
	console.log(arrayInfo)
res.redirect(`profileifr.html?info=${arrayInfo}`)
	
})





module.exports = router
