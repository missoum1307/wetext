var express = require('express')
var mongoose = require('./mongoose.js')
var modeluser = require('./model.js')
var bcrypt = require('bcryptjs')
var router = express.Router()
router.get('/progress', async (req, res) => {
	let sc = 0 
	
	if (JSON.parse(req.query.progress)[req.query.ps][2]) {
		if (req.query.ps <= 20) {
			sc = 13
		} else if (req.query.ps <= 41) {
			sc = 33
		}else { 
			sc = 77
		} 
	}
	
const doc = await modeluser.findOne({ _id: req.query.sid, un: req.query.username});

	try {
	if (sc > 0 && JSON.parse(doc.pr[req.query.ps])[req.query.ps][2] !== 1) {

	doc.sc = doc.sc + sc
	
}
} catch (error) {
  console.error(error);

}
	
	

	
doc.pr.set(req.query.ps,req.query.progress)
	
await doc.save();

 try {
    res.send(200)
  } catch (e) {
    res.send(500)
  } 
})
router.get('/updateinfo', async (req, res) => {
 
var {usernameUpdate, password, username, sid} = req.query
// var hashpasswed = await bcrypt.hash(password, 8)


let userExit = async (user) => {
	 await modeluser
    .findOne({
        un: user
    })
    .then(async (data) => {
		 
		 
		 
	if (username == usernameUpdate) {
		
            if (password) {
					  await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: password })
						res.write(user)
					 
				     } else {
					   await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user})
						res.write(user)  
				     }
		
	   }  else {
			if (data == null || (data &&  data._id == sid )) {
				 if (password) {
					  await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user, pw: password })
						res.write(user)
					 
				     } else {
					   await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: user})
						res.write(user)  
				     }

           			
		    
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
// var hashpasswed = await bcrypt.hash(password, 8)
let userEmail = async (emailarg) => {
	 await modeluser
    .findOne({
        em: emailarg
    })
    .then(async (data) => {
		 
		 
		 
	if (email == emailarg) {
		 if (password !== '') {
			 await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg, pw: password })
		    res.write(emailarg)
		     } else {
			     await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg })
		    res.write(emailarg)
		     } 

	   }  else {
			if (data == null || (data &&  data._id == sid )) {
				if (password !== '') {
					await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg, pw: password })
					res.write(emailarg)
				} else {
					await modeluser.findOneAndUpdate({em: email, _id: sid }, { em: emailarg })
					res.write(emailarg)
				} 
		    
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
	res.header('Access-Control-Allow-Origin', '*');
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
