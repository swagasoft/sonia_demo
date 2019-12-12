const mongoose = require('mongoose');

var profileSchema = mongoose.Schema({

    fullname : {
        type: String
    },
    email : {
        type: String
    },
    nationality : {
        type: String
    },
    acount_number : {
        type: Number
    },
    account_name : {
        type: String
    },
    bank : {
        type: String
    },
    user_id : {
        type: String
    },
    date : {
        type: Date, default: Date.now()
    },
  
});

mongoose.model('Profile', profileSchema);