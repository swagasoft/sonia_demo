const mongoose = require('mongoose');

var youtubeSchema = mongoose.Schema({

  
    link : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },

});

mongoose.model('youtubeLink', youtubeSchema);