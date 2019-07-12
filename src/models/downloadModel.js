import mongoose from 'mongoose'
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema
 
const UserSchema = new Schema({
    Firstname: {
        type: String,
        required:"Firstname is not valid"
    },

    Lastname:{
        type: String,
        required:"Lastname is not valid"
    },

    Email : {
        type: String,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        required:"Email is not valid",
        unique:true
    },


    Password:{
        type: String,
        match: /(?=.*[a-zA-Z])(?=.*[0-9]+).{5,8}.*/,
        required:"password is not valid"
    },


    ConformPassword:{
        type: String,
        
        required:"Password is not valid"
    },

    Created_at:{
        type: Date,
        default: Date.now
    },
    Updated_at:{
        type: Date,
        default: Date.now
    }
    
})

 
export default UserSchema;