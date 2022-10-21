const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: { type: String, required: true, index: true},
    email: { type: String, required: true, unique: true, index: true},
    password: { type: String, required: true, index: true},
    date: { type: Date, default: Date.now, index: true},
});

module.exports = mongoose.model("user", UserSchema)