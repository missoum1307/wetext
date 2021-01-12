var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://wordfield:dQ9rKfJElrTnsrZ4@wordfieldcluster.jxdie.mongodb.net/wf?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

var db = mongoose.connection;
db.on('error', (err)=> {
   console.log(err);
});
db.once('open', () => {
   console.log('Connection opened on:', 'mongodb+srv://wordfield:EsOnBnbVtsxiqGFx@wordfieldcluster.jxdie.mongodb.net/wf?retryWrites=true&w=majority');
});

exports.db = db
module.exports = mongoose
