import mongoose from 'mongoose'
import downloadSchema from '../models/downloadModel'
 
const User = mongoose.model('User', downloadSchema)
 

exports.addNewUser = (req, res) => {
    console.log("hi welcome")
    let newUser = new User(req.body)
    newUser.save((error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
}

exports.getUsers = (req, res) => {
    User.find({}, (error, data) => {
        if (error) { res.json(error) }
        res.json(data)
    })
    
}
// exports.getfirstname = (req, res) =>{
//     console.log("firstname")
//     User.find({}, (error, data) => {
//         if (error) { res.json(error) }
//         res.json(data)
//     })

// }
 
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