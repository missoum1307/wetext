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
let arrayInfo = ''


res.setHeader('Content-Type', 'application/json');
	
try {
 modeluser
    .findOne({
        un: usernameUpdate
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
		   arrayInfo = `{"0":"${usernameUpdate}",`
		   console.log(1, arrayInfo)
		    res.write(`${arrayInfo}`)
		
           } else (data._id == sid) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { un: usernameUpdate, pw: hashpasswed })
			arrayInfo = `{"0":"${usernameUpdate}"`
			console.log(2, arrayInfo)
		    res.write(`${arrayInfo},`)
           } else {
		   arrayInfo = `{"0":true,`
		   console.log(3, arrayInfo)
		    res.write(`${arrayInfo}`)
	   }
	  console.log(4, arrayInfo)
		
	  
    })
	

	
} catch (error) {
	console.log(13, arrayInfo)
 	console.error(error);
	res.write(`${JSON.stringify(arrayInfo)}`)
}

	

try {
 modeluser
    .findOne({
	em: email
    })
    .then(async (data) => {
           if (data == null) {
            await modeluser.findOneAndUpdate({un: username, _id: sid }, {em: email, pw: hashpasswed })
		   arrayInfo += `"1":"${email}"}`
		   console.log(5, arrayInfo)
		    res.write(`${arrayInfo}`)
           } else if (data._id == sid) {
          
            await modeluser.findOneAndUpdate({un: username, _id: sid }, { em: email, pw: hashpasswed })
		   
		    arrayInfo += `"1":"${email}"}`
		    console.log(6, arrayInfo)
		    res.write(`${arrayInfo}`)
           } else {
		    arrayInfo += `"1":true}`
		    console.log(7, arrayInfo)
		    res.write(`${arrayInfo}`)
	   }
	  console.log(8, arrayInfo)

	
    })
	
res.end(); 
	
} catch (error) {
	console.log(14, arrayInfo)

 	console.error(error);
	
}



	

	
})





module.exports = router
