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
        un: usernameUpdate,
	em: email
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, em: email, pw: hashpasswed })
		   arrayInfo[0] = usernameUpdate
		   arrayInfo[0] = email
		
           } else if (data._id == sid) {
          
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, em: email, pw: hashpasswed })
			arrayInfo[0] = usernameUpdate
		   	arrayInfo[0] = email
           } else {
		   arrayInfo[2] = true
	   }
	  console.log(1, arrayInfo)
	  res.redirect(`profileifr.html?info=${JSON.stringify(arrayInfo)}`)
    })
	

	
} catch (error) {
	console.log(3, arrayInfo)
 	console.error(error);
}



	

	
})





module.exports = router
