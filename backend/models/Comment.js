const mongoose = require('mongoose');

const { Schema } = mongoose;
const commentSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'testuser'
    },
    about:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'testsecret'
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
  module.exports=mongoose.model('testcomment',commentSchema);