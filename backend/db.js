const mongoose = require('mongoose')
const mongooseURI = 'mongodb://localhost:27017/iNoteBook'

const connectToMongo = ()=>{
    mongoose.connect(mongooseURI, ()=>{
        console.log("Mongoose is Connected");
    })
}

module.exports = connectToMongo;