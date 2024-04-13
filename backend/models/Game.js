const mongoose = require('mongoose');

const { Schema } = mongoose;
const gameSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
  });
  module.exports=mongoose.model('gambino-games',gameSchema);