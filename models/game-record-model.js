const mongoose = require('mongoose');

var GameRecordShcema = mongoose.Schema({

    correct_qst: {
        type: Number,
        required: true,
    },
    wrong_qst: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    minutes: {
        type: Number,
        required: true,
    },

    seconds: {
        type: Number,
        required: true,
    },
   
    Date: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: String,
      
    },
});


mongoose.model('Game_record', GameRecordShcema);