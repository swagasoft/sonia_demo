const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var random = require('mongoose-simple-random');

var questionschema = mongoose.Schema({

    question: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        enum:['economics','sport','movie','science','history','politics','arts','tourism'],
        required: true,
    },
    option1: {
        type: String,
        required: true,
    },
    option2: {
        type: String,
        required: true,
    },
    option3: {
        type: String,
        required: true,
    },
    option4: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    tip: {
        type: String,
        required: true,
    },
    serialNm: {
        type: Number,
    },
    status: {
        type: Boolean,
       default: true
    },
});

// Apply the uniqueValidator plugin to userSchema.
questionschema.plugin(uniqueValidator);
questionschema.plugin(random);

mongoose.model('Question', questionschema);