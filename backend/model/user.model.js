const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },role:{
        type:String,
        enum:['student', 'teacher', 'admin'], default:'student'
    },
    status:{
        type:String, default:'active'
    }


}, {timestamps:true})


module.exports = mongoose.model('user', userSchema);