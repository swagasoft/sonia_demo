const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
// const DATABASE = 'mongodb://localhost:27017/i-sabi';
// const DATABASE = 'mongodb+srv://swagasoft:simoopam222@cluster0-cexmj.mongodb.net/i-sabi?retryWrites=true&w=majority';
const DATABASE = 'mongodb+srv://swagasoft:simoopam222@cluster0-cexmj.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(DATABASE,{useNewUrlParser : true}, (err) => {
    if(!err) console.log(DATABASE,'mongodb connection successful..');
    else
    console.log("error in connection"+ JSON.stringify(err, undefined, 2));
});

require('./users_model');
require('./account-model');
require('./users_model');
require('./questions_model');
require('./transaction-model');
require('./profile_model');
require('./admin_model');
require('./game-record-model');
require('./youtube_model');