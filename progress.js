var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var bcrypt = require('bcryptjs')
var router = express.Router()
router.get('/progress', async (req, res) => {
	console.log(req.query.progress)
	
const doc = await modeluser.findOne({ _id: req.query.sid, un: req.query.username});
	
doc.pr.set(req.query.ps,req.query.progress)

	
await doc.save();
 try {
    res.send(200)
  } catch (e) {
    res.send(500)
  } 
})console.log(req.query.progress)
router.get('/updateinfo', async (req, res) => {
 
var {usernameUpdate, password, username, sid} = req.query
var hashpasswed = await bcrypt.hash(password, 8)
let userExit = async (user) => {
	 await modeluser
    .findOne({
        un: user
    })
    .then(async (data) => {
	if (username == usernameUpdate) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: hashpasswed })
		    res.write(user)
	   }  else {
			if (data == null || (data &&  data._id == sid )) {
           			 await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: hashpasswed })
				res.write(user)
		    
        		 } else {
		   		
		   		 res.write('false')
	  		 }
	   
	   }
		 
		res.end()
  
    })
}
	
try {
	userExit(usernameUpdate)
} catch (error) {
 	console.error(error);
}
      	
})
router.get('/updateinfoemail', async (req, res) => {
 
var {email, password, emailupdate, sid} = req.query
var hashpasswed = await bcrypt.hash(password, 8)
let userEmail = async (emailarg) => {
	 await modeluser
    .findOne({
        em: emailarg
    })
    .then(async (data) => {
	if (email == emailarg) {
            await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg, pw: hashpasswed })
		    res.write(emailarg)
	   }  else {
			if (data == null || (data &&  data._id == sid )) {
           			 await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg, pw: hashpasswed })
				res.write(emailarg)
		    
        		 } else {
		   		
		   		 res.write('false')
	  		 }
	   
	   }
		 
		res.end()
  
    })
}
	
try {
	userEmail(emailupdate)
} catch (error) {
 	console.error(error);
}
      	
})
router.get('/getplayers', async (req, res) => {
const players = await modeluser.find({})
let playerObj = []
for (let i = 0; i < players.length; i++) {
  playerObj.push([players[i]['un'],players[i]['sc']])

}


 try {
    res.send(playerObj)
  } catch (e) {
    res.send(500)
  } 
})
module.exports = router
