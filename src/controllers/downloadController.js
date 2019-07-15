const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

import mongoose from 'mongoose'
import downloadSchema from '../models/downloadModel'
const User = mongoose.model('User', downloadSchema)

exports.addNewUser = function(req, res){
  console.log(req.body);
  User.find({email: req.body.email},function(err, data){
    if(data != null && data != ''){
      res.send('User already exists');
    }
    else
   
    {
      var userdetails = new User(req.body);
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(userdetails.password, salt, function(err, hash) {
          userdetails.password = hash;
          userdetails.save(function(err, data){
            if(err)
              res.send(err.message);
            
            res.json(data)
          })
        })
      })
    }
  });
};

//********* SignIn ******************************// 
exports.login = function(req,res){
  User.find({email: req.body.email}, function(err, data){
    if(data != null && data != ''){
      bcrypt.compare(req.body.password, data[0].password, function( err, isMatch) {
        if(isMatch == true){
          res.status(200).json(data);
        }else{
          res.send("Entered Password does not matched");
        }
      });
    } else{
      res.send("This User does not exists");
    }
  });
};

  












