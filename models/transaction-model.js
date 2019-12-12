const mongoose = require('mongoose');

var tranxSchema = mongoose.Schema({
    user_id : {
        type: String
    },
    account_id : {
        type: String
    },
    username : {
        type: String
    },
    message : {
        type: String
    },
    ref : {
        type: String
    },
    status : {
        type: String
    },
    amount : {
        type: Number
    },
    trax : {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

mongoose.model('Tranx', tranxSchema)