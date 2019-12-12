const mongoose = require('mongoose');
const QuestionModel = mongoose.model('Question');
const AdminDateModel = mongoose.model('adminDate');
const YoutubeModel = mongoose.model('youtubeLink');
const LODASH = require('lodash');


const postQuestion = async (req, res)=> {
    let serial = 10
    var Question = new QuestionModel();
    Question.answer = req.body.answer; 
    Question.category = req.body.category;
    Question.option1 = req.body.option1;
    Question.option2 = req.body.option2;
    Question.option3 = req.body.option3;
    Question.option4 = req.body.option4;
    Question.question = req.body.question;
    Question.status = req.body.status;
    Question.tip = req.body.tip;
    Question.status = true;
    Question.serialNm = 0;
    Question.save().then((qst, err) => {
        if (!err){
            res.status(200).send({status: true, message:' question saved!'})
        }else{
                console.log('ERROR SAVING DATA')
           
        }

    }).catch((err)=> {
        console.log(err);
        switch(err){
            case 1: if(err.errors.answer){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == ANSWER'});
            }
            break;
            case 2: if(err.errors.category){
                res.status(422).send({status: false, message: 'error  == CATEGORY'});
            }
            break;
            case 3: if(err.errors.option1){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == OPTION-1'});
            }
            break;
            case 4: if(err.errors.option2){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == OPTION-2'});
            }
            break;
            case 5: if(err.errors.option3){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == OPTION-3'});
            }
            break;
            case 6: if(err.errors.option4){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == OPTION-4'});
            }
            break;
            case 7: if(err.errors.question){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == QUESTION'});
            }
            break;
            case 8: if(err.errors.tip){
                res.status(422).send({status: false,  ERROR:err, message: 'error  == TIP'});
            }
            break;
            default:
                    res.status(422).send({status: false, ERROR:err, message: 'error saving document!'}); 

            
        }
    }); // end of money

}

const setAdminDate = async (req, res)=> {
    let appdate = req.params.appdate;
    AdminDateModel.findOne({name: 'ADMIN'}, (err, doc)=> {
        if(doc){
            AdminDateModel.findOneAndUpdate({name:'ADMIN'}, {$set: {appdate: appdate}}).then(()=> {
                res.status(201).send({message:' update successful'});
            });
        }else{
            let appData = new AdminDateModel();
            appData.appdate = appdate;
            appData.name = "ADMIN";
            appData.save().then(()=> {
                res.status(201).send({message:' new record creates'});
            })
        }
    });
    // console.log('set admin time fires...', appdate);
}

const setYoutubeLink = async( req, res) => {
    
    let newLink = req.body.link;
    YoutubeModel.findOne({name:'ADMIN'}, (err, link)=> {
        if(link){
            YoutubeModel.findOneAndUpdate({name:'ADMIN'}, {$set: {link : newLink}}).then(()=> {
                res.status(201).send(({message: 'update sucessful'}));
            });
        }else{
            // console.log('no doc to update..');
            let NewLink = new YoutubeModel();
            NewLink.link = newyoutubeLink;
            NewLink.name = 'ADMIN';
            NewLink.save().then(()=> {
                res.status(201).send({message:' new record creates'});
            });

        }
    })
}


const getAdminDate = async (req, res)=> {
    AdminDateModel.findOne({name:'ADMIN'}, (err, data)=> {
        if(data){
            res.status(200).send({doc: LODASH.pick(data,['appdate'])});
        }else{
            res.status(404).send({message: 'data not found'});
        }
    });
}

const getYoutubeLink = async (req, res)=> {
    YoutubeModel.findOne({name:'ADMIN'}, (err, urlData) => {
        if(urlData){
            res.status(200).send({doc: LODASH.pick(urlData,['link'])});
        }else{
            res.status(404).send({message: 'data not found'});
        }
    });
}

module.exports= {postQuestion, setAdminDate,getYoutubeLink,setYoutubeLink, getAdminDate}