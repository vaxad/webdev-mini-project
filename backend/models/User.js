const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    startTime:{
        type:Date,
        default:Date.now,
        required:true
    },
    endTime:{
        type:Date,
        default:Date.now,
        required:true
    },
    genre:{
        type:[String],
        required:true
    },
    rank:{
        type:String,
        required:true
    },
    interestedGames:{
        type:[String],
        required:true
    },
    frieds:{
        type:[String],
        required:true
    },
  });
  const User=mongoose.model('gambino-user',userSchema);
  module.exports=User;