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

let userExit = async (user) => {
	 await modeluser
    .findOne({
        un: user
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: hashpasswed })
		    arrayInfo[0] = user
		    return user
		   

       
           } else if (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: hashpasswed })
		arrayInfo[0] = user
		    return user
		    
           } else {
		   arrayInfo[0] = true
		    return true
	   }
	  console.log(4, arrayInfo)
  
    })
}

	
try {
	// find username
	userExit(usernameUpdate)
	
} catch (error) {

 	console.error(error);
}
      	
})



module.exports = router
