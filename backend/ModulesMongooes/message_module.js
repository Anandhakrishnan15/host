const mongoose  = require("mongoose");

// this data bas will store every messages send my the used in he databac

const messageModel = new mongoose.Schema({
  senderID :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  resiversID :{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    require:true
  },
  message:{
    type:String,
    require:true
  }
},{
    timestamps:true
})

const Message = new mongoose.model("message",messageModel);
module.exports = Message

