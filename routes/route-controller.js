const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller');
const userController = require('../controllers/user_controller');
const AdminController = require('../controllers/admin-controller');
const QuestionController = require('../controllers/question-controller');
const transactionController = require('../controllers/tranx-controller');
const RecordController = require('../controllers/record-controller');
const jwt_helper = require('../config/jwt_helper');
const mongoose  = require('mongoose');
const UserModel = mongoose.model('User');

router.post('/register' , userController.register);
router.post('/login', userController.login)
router.get('/test_api', userController.testApi);
router.get('/get-all-questions', jwt_helper.verifyJwtToken,QuestionController.getAllQuestions );
router.get('/find-by-category:category', jwt_helper.verifyJwtToken,QuestionController.findByCategory);
router.get('/change-to-true:id',QuestionController.changeToTrue);
router.get('/change-to-false:id', jwt_helper.verifyJwtToken,QuestionController.changeToFalse);
router.get('/get-single-question:id', jwt_helper.verifyJwtToken,QuestionController.getSingleQuestion);
router.get('/delete-question:id',jwt_helper.verifyJwtToken,QuestionController.deleteQuestion);
router.post('/update-question', jwt_helper.verifyJwtToken, QuestionController.updateQuestion);
router.post('/submit-transaction',  jwt_helper.verifyJwtToken, transactionController.Transaction );
router.get('/get-account-balance', jwt_helper.verifyJwtToken, transactionController.loadBalance);
router.get('/get-random-questions-for-game',jwt_helper.verifyJwtToken,QuestionController.getQuestionsForGame);
router.post('/save-user-profile', jwt_helper.verifyJwtToken, userController.saveUserprofile);
router.get('/get-user-profile', jwt_helper.verifyJwtToken, userController.getUserProfile);
router.post('/post-game-record', jwt_helper.verifyJwtToken, RecordController.postGameRecord);
router.get('/get-game-record', jwt_helper.verifyJwtToken, RecordController.getGameRecord);
router.get('/delete-game-record:id', jwt_helper.verifyJwtToken, RecordController.deleteGameRecord);
router.get('/deduct-game-amount', jwt_helper.verifyJwtToken, userController.deductGameAmount);
router.get('/get-leaderboard', jwt_helper.verifyJwtToken, RecordController.getLeaderBorad);
router.get('/get-leaderboard-game-section', jwt_helper.verifyJwtToken, RecordController.getLeaderBoradGame);
router.get('/game-fun-fact-tips', jwt_helper.verifyJwtToken,QuestionController.getRandomTip);
router.get('/confirm-user-number:number',  userController.confirmUserNumber);
router.get('/get-my-transaction', jwt_helper.verifyJwtToken, transactionController.getMyTransaction);
router.get('/confirm-user-otp:otp', userController.confirmUserOtp);

// admin routes section
router.post('/post-question', AdminController.postQuestion);
router.get('/get-manual-transactions', transactionController.getManualTransaction);
router.get('/confirm-transaction:id', transactionController.confirmAccount)
router.get('/submit-admin-date:appdate', jwt_helper.verifyJwtToken, AdminController.setAdminDate );
router.post('/submit-youtube-link', jwt_helper.verifyJwtToken, AdminController.setYoutubeLink);
router.get('/get-youtube-link', jwt_helper.verifyJwtToken, AdminController.getYoutubeLink);
router.get('/get-admin-date', jwt_helper.verifyJwtToken, AdminController.getAdminDate );


async function  middleware(req,res, next){
  await UserModel.find({}).then((docs)=> {
     docs.forEach((doc)=> {
         console.log(doc.phone);
     })
  })
    next();
}


module.exports = router;