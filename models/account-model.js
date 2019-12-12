const mongoose = require('mongoose');

var accountSchema = mongoose.Schema({

    balance : {
        type: Number
    },
    username : {
        type: String
    },
    user_id : {
        type: String
    },
    date : {
        type: Date, default: Date.now()
    },
  
});

mongoose.model('Account', accountSchema);