const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    activated:{
        type:Boolean,
        required:false,
        default:false
    },
    userName:{
        type:String,
        required:false
    },
    avatar:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('User',userSchema);