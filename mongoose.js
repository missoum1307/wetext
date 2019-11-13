var mongoose = require('mongoose')
//var url = 'mongodb://127.0.0.1:27017/wetext'
var url = 'mongodb://missoum1307:missoum16@ds059651.mlab.com:59651/wetext'
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