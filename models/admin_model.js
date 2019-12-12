const mongoose = require('mongoose');

var adminSchema = mongoose.Schema({

  
    appdate : {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
   
  
  
  
});

mongoose.model('adminDate', adminSchema);