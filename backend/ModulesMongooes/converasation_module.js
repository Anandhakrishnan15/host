const  mongoose = require("mongoose");

// this will save the comvrsation betwen the 2 users in and array
const conversationModule = new mongoose.Schema({
    particepitaion:[
       { type:mongoose.Schema.Types.ObjectId,
        ref:"User"    
        
    }
    ],
   messages:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"Messages",
        default:[]
        }
    ]
},{
    timestamps:true
})
const Conversation = new mongoose.model("converstions",conversationModule)
module.exports= Conversation
