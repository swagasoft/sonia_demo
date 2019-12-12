const mongoose = require('mongoose');
const TranxModel = mongoose.model('Tranx');
const UserModel = mongoose.model('User');


Transaction = async (req, res) => {
    console.log(req.body);
    var Tranx = new TranxModel();
    Tranx.user_id = req._id;
    Tranx.account_id = req.body.account_id;
    Tranx.username = req.body.username;
    Tranx.status = req.body.status;
    Tranx.trax = req.body.transaction;
    Tranx.ref = req.body.trxref;
    Tranx.amount = req.body.amount;
    Tranx.save();

    await UserModel.findOneAndUpdate({_id:req._id}, {$inc: {balance : req.body.amount}});
    res.status(200).send({message : 'transaction saved...'});
}

getManualTransaction = async ( req, res) => {
    TranxModel.find({status : 'processing'}, (error , list)=> {
        res.status(200).send({trans : list});
    });
}

confirmAccount = async (req, res)=> {
    let accountId = req.params.id;
   await TranxModel.findOne({_id : accountId}, (err, document)=> {
        document.status = 'success';
        document.save().then(()=> {
            console.log('THIS IS IT',document)
            UserModel.updateOne({_id: document.user_id}, {amount : document.amount }).then(()=> {
                res.status(200).send({message : 'sucesss'});

            })
        })
    })
}


loadBalance = async (req, res) => {
    UserModel.findOne({_id: req._id}).select('balance').then((doc)=> {

        res.status(200).send(doc);
    });
}

getMyTransaction = async ( req, res) => {
    TranxModel.find({user_id : req._id}).sort({date : -1}).then((tranx) => {
       if(tranx){
        res.status(200).send({transaction : tranx});
       }else{
           res.status(404).send({message : ' trans not found'});
       }
    });
}



module.exports = { Transaction, loadBalance, confirmAccount,
    getManualTransaction, getMyTransaction}