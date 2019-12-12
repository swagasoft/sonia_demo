const mongoose = require('mongoose');
const QuestionModel = mongoose.model('Question');
const GameRecord = mongoose.model('Game_record');
const UserModel = mongoose.model('User');



postGameRecord = async (req, res, next)=> {

    await UserModel.findOne({_id : req._id}).select('username').then((AppUsername)=> {
            let myUser = AppUsername['username'];
        var gameRecord = new GameRecord();
        gameRecord.user = myUser;
        gameRecord.correct_qst = req.body.correct_qst;
        gameRecord.wrong_qst = req.body.wrong_qst;
        gameRecord.minutes = req.body.minutes;
        gameRecord.seconds = req.body.seconds;
        gameRecord.user_id = req._id;
        gameRecord.save();

    res.status(200).send({message : 'i got your message'});
    });
  
}

getGameRecord = async (req, res)=> {
    await GameRecord.find({user_id : req._id}, (err, document)=> {
        if(document){
            res.status(200).send(document);
        }else{
            res.status(204);
        }
        
    })
}

deleteGameRecord = async (req, res) => {
    let file_id = req.params.id ;
    await GameRecord.deleteOne({_id: file_id}).then(()=> {
        res.status(200).send({ message: 'message deleted'});
    });
}

getLeaderBorad = async (req, res) => {
    await GameRecord.find({correct_qst : 15}).sort({seconds : 1}).sort({minutes : 1}).limit(30).then((leaders)=> {
        res.status(200).send({ document : leaders});
    })
}

getLeaderBoradGame = async (req, res) => {
    await GameRecord.find({correct_qst : 15}).sort({seconds : 1}).sort({minutes : 1}).limit(4).then((leaders)=> {
        res.status(200).send({ document : leaders});
    });
}



module.exports = { postGameRecord, getLeaderBorad ,getLeaderBoradGame,
     getGameRecord, deleteGameRecord}

