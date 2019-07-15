import express from 'express'
import routes from './src/routes/downloadRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
// import downloadModel from './src/models/downloadModel'
 
const app = express()
const PORT = 9003
 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/usertable')
// mongoose.connect('mongodb://localhost:27017/todo-app')
 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
 
routes(app)
 
app.listen(PORT, () => {
    console.log(`you are server is running on ${PORT}`);
})

