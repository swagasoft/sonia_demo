const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');



var userSchema = mongoose.Schema({

   
    phone: {
        type: Number,
        required: true,
        unique: true,

    },
    user_id: {
        type: String,   

    },
    username: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required:'password is required',
        minlength : [6, 'password must be at least 6 character']

    } ,
    balance: {
        type: Number,
        default: 0

    } ,

  
    role: {
        type: String,
        enum : ['USER','ADMIN','ACCOUNTANT'],
        default: 'USER'
    } ,
    activate: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date, default: Date.now()
    },
});

// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);
 
// custom validation
userSchema.path('phone').validate((val)=> {
    phoneRegex =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(val);
}, 'invalid Phone  number');

// methods

// generate jwt token...
userSchema.methods.generateJwt = (user)=> {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({_id: user._id, email: user.email,
        exp: parseInt(expiry.getTime() / 1000),},
         process.env.JWT_SECRET);
}

mongoose.model('User', userSchema);