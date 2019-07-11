import mongoose from 'mongoose'
 
const Schema = mongoose.Schema
 
const UserSchema = new Schema({
    Firstname: {
        type: String,
        required:"Invalid First Name"
    },

    Lastname:{
    type: String,
    required:"Invalid lst Name"
    },

    Email : {
     type: String,
    
     required:"Email is not valid"
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