const mongoose = require('mongoose');
const User = mongoose.model('User');
const ProfileModel = mongoose.model('Profile');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const lodash = require('lodash');
const request = require('request');
const register = async (req, res, next)=> { 


  let x  = 100;
  while(x > 1){
    x--;
    var date = new Date();
    var components = [
        date.getYear(),
        date.getDate(),
        date.getHours(),
        date.getMilliseconds()
    ];
    
    var timestamp = components.join("");
  console.log(timestamp);
  }


  var date = new Date();
  var components = [
      date.getYear(),
      date.getDate(),
      date.getHours(),
      date.getMilliseconds()
  ];
  
  var timestamp = components.join("");


  let userID =  timestamp;
  var user = new User();
    user.phone = req.body.number;
    user.user_id = userID;
    user.username = req.body.username.toLowerCase();
    let cryptpassword = cryptr.encrypt(req.body.password);
    user.password =  cryptpassword; 
    user.save().then(( newUser, err) => {
        if(!err){
          res.status(200).send(['Registration successful...']);
        }else{
            res.status(500).send(['Error in user information']);
        }
        
    }).catch((err)=> {
      console.log(err);
        if(err.errors.username){
            res.status(422).send(['Username has been taken!']);
        }else if(err.errors.phone){
            res.status(499).send(['Phone number has been used!']);
        
        }else if(err.errors.password){
            res.status(499).send([' Error in password!']);
        }else{
            res.status(501).send([' Contact admin...']);
        }
    });
    
   
}
const testApi = (req, res, next)=> {
    console.log('testing fires');

    res.status(200).send({message: 'api is working...'});
}

// login controller
const login = (req, res, done)=> {
    let phone = req.body.number;
    let password = req.body.password;
    User.findOne({phone:phone},(errr, user)=> {
      //  unknown user
      if(!user){
        res.status(404).send([' User not found.']);
      }else{
    let AppUser = user.phone;
    let databasePassword = user.password;
    let decrypePass = cryptr.decrypt(databasePassword);
    
        if(decrypePass === password){
          token = user.generateJwt(user);
          // send user role to client...
          res.json({"token":token ,  doc: lodash.pick(user, ['role','user_id', 'balance','email','username'])});
    
        }else{
          res.status(401).send([ ' Invalid User Credentials.']);
        }
    }
    });
    }

    saveUserprofile = async (req, res) => {
      console.log(req.body);
      console.log('FIRES SAVE PROFILE...');
      var Profile = new ProfileModel();
      Profile.fullname = req.body.fullname;
      Profile.nationality = req.body.nationality;
      Profile.acount_number = req.body.accountNumber;
      Profile.account_name = req.body.accountName;
      Profile.bank = req.body.bank;
      Profile.email = req.body.email;
      Profile.user_id = req._id;
      Profile.save().then(()=> { 
        res.status(201).send({message: 'Credentials saved!'});
      });
    }

    getUserProfile = async (req, res)=> {
      ProfileModel.findOne({user_id: req._id}, (error, profile)=> {
        if(profile){

          res.status(200).send(profile);
        }else{
          res.status(404).send({message: 'profile not found'});
        }
      });
    }

    deductGameAmount = async (req, res)=> {
      let user_id = req._id;
        await User.updateOne({_id : user_id}, {$inc : {balance : -200}}).then(()=> {

          res.status(200).send({message: 'successful'});
        });
    }

    confirmUserNumber = async (req, res) => {
      let UserNumber = req.params.number;
      
       await User.findOne({phone: UserNumber}, (err, phone)=> {
        if(phone){
            let OTP = `${Math.ceil(Math.random() * 10e4)}`;
              res.status(200).send({message : 'number exist', otp: OTP});

        }else{
          console.log('USER PHONE NOT FOUND..');
          res.status(404).send({message : 'number not found'});

        }
       });

    }


    confirmUserOtp = async (req, res) => {
      console.log(req.params.otp);

      res.status(200).send({message : 'otp received'});
    }

module.exports = {register, testApi, getUserProfile,
  login,deductGameAmount, saveUserprofile, confirmUserNumber, confirmUserOtp}