const mongoose = require('mongoose');

const { Schema } = mongoose;
const secretSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'testuser'
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'testuser'
    }],
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    },
    updatedAt:{
        type:Date,
        default:Date.now,
        required:true
    }
  });
  module.exports=mongoose.model('testsecret',secretSchema);