const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

import mongoose from 'mongoose'
import downloadSchema from '../models/downloadModel'
const User = mongoose.model('User', downloadSchema)
exports.addNewUser = (req, res,next) => {   
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const ConformPassword = req.body.ConformPassword;
    const Created_at = req.body.Created_at;
    const Updated_at = req.body.Updated_at;
    bcrypt.hash(Password, 12)
        .then(hashedPw => {
            const user = new User({
                Firstname:Firstname,
                Lastname:Lastname,
                Email:Email,
                Password:hashedPw,
                ConformPassword:ConformPassword,
                Created_at:Created_at,
                Updated_at:Updated_at
            })
            if(Password!==ConformPassword){
                res.status(200).json({
                    message: 'Password mismatch',
                })   
            }
            else{
            return user.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message: 'user created',
                    userId: result._id
                })
            })
            .catch(err => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
            next(err);
        })
            }
    });
}
exports.getUsers = (req, res) => {
    User.find({}, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
    
}
// get single download based on the id
export function getUser(req, res) {
    User.findById(req.params.id, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
}
// // update the download information based on id
export function updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
}
// // delete the download from the database.
export function deleteUser(req, res) {
    User.remove({ _id: req.params.id }, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
}

exports.login = (req,res,next) =>{
    const Email = req.body.Email;
    const Password = req.body.Password;
    User.findOne({Email: Email})
    .then(user =>{
        if(bcrypt.compare(Password,user.Password)&& bcrypt.compare(Email,user.Email)){
            res.status(200).json({
                message: 'Login succesfully',
            })
        }
    })
    const err='user not found'
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 505;   
        }
        next(err);
    })  
}
