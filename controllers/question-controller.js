const mongoose = require('mongoose');
const QuestionModel = mongoose.model('Question');
const LODASH = require('lodash');



getAllQuestions = async (req, res, next) => {
    await QuestionModel.find({}, (err, doc) => {

    res.status(200).send({questions: doc});
    });
}

updateQuestion = async ( req, res) => {
    await QuestionModel.update({_id: req.body.id}, {$set: {
        question: req.body.question, answer: req.body.answer,
        tip: req.body.tip, option1: req.body.option1,
        option2: req.body.option2, option3: req.body.option3,
        option4: req.body.option4
    }}).then(()=> {
            res.status(200).send({message: 'update successful'});
        
    });
}

getQuestionsForGame = async (req, res)=> {
    QuestionModel.findRandom({status: true}, {}, {limit: 15}, function(err, questions) {
        if (!err) {
           if(questions){
                res.status(200).send({'questions' : questions});
            }else{
                res.status(404).send({message: 'questions not found'});
            }
        }
      });   
}

getRandomTip = async (req, res) => {
    QuestionModel.findRandom({status: true}, {}, {limit: 500}, (err, tips)=> {
        if(tips){
            res.status(200).send({gamestips: tips });
        }else{
            res.status(404).send({message: 'questions not found'});
        }
    });
}

findByCategory = async (req, res, next) => {
    console.log('BODY', req.params.category);
    var category = req.params.category;
   var query =  QuestionModel.where({"category": category});
   query.find((err, docs)=> {
       if(err){
           console.log('error getting data',+ err);
       }else{
           res.status(200).send({questions: docs});
       }
   })
}

changeToFalse = async (req, res,next) => {
    console.log('status to false');
    var docId = req.params.id;
    QuestionModel.findOneAndUpdate({_id: docId }, {$set: { status: false}}).then(()=> {
        res.status(200).send({message: 'success'});
    });
}
changeToTrue = async (req, res,next) => {
    console.log('status to true');
    var docId = req.params.id;
    QuestionModel.findOneAndUpdate({_id: docId }, {$set: { status: true}}).then(()=> {
        res.status(200).send({message: 'success'});
    });
}

deleteQuestion = async (req, res)=> {
    console.log('question model fires', req.params.id);
QuestionModel.deleteOne({_id : req.params.id}).then(()=> {
    res.status(200).send({message : 'question has been deleted...'});
});
}

getSingleQuestion = async (req, res , next) => {
var id = req.params.id;
QuestionModel.findOne({_id : id}, (error, document) => {
    if(!error){
        res.status(200).send({doc: document});
    }else{
        res.status(402).send({message: 'error getting data'});
    }
});
}


module.exports = { getAllQuestions, getRandomTip, getSingleQuestion,
     findByCategory , changeToFalse, changeToTrue, deleteQuestion,
    getQuestionsForGame, updateQuestion}