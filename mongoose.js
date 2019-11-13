var mongoose = require('mongoose')
//var url = 'mongodb://127.0.0.1:27017/wetext'
var url = 'mongodb://missoum1307:missoum16@ds041248.mlab.com:41248/heroku_656wp5wd'
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', (err)=> {
   console.log(err);
});
db.once('open', () => {
   console.log('Connection opened on:', url);
});

exports.db = db
module.exports = mongoose