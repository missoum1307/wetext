var mongoose = require('mongoose')
mongoose.connect(process.env.urldbdev, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

var db = mongoose.connection;
db.on('error', (err)=> {
   console.log(err);
});
db.once('open', () => {
   console.log('Connection opened on:', process.env.urldbdev);
});

exports.db = db
module.exports = mongoose