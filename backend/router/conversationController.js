const Conversation = require("../ModulesMongooes/converasation_module");
const Message = require ("../ModulesMongooes/message_module")
const conversationcontoller = async (req,res)=>{
     //now we will stoer the messages and the cnvestion betten the users
    try {
        // console.log("hellooo");
        // get the message,senders Id and resiversId and store that in the database
        const {message} = req.body;//the mssge from th body 
        const {id:resiversID} = req.params//the resivers id from the parms
        const senderID = req.userId//the senders id from the datavrifiction  
        console.log(`senders id ${senderID},reisvers id ${resiversID},message${message}`);
        // now create a convestion colletion if the is not created between the sender and resiver
        const converstion= await Conversation.findOne({
            particepitaion:{$all:[senderID,resiversID]},
        })
        console.log("coverdation find ",converstion);
        // if a cconverstion id not there maek anew converstion
        if(!converstion){
             await Conversation.create({
             particepitaion:[senderID,resiversID]
            })
        }
        const newMessage= new Message({
            resiversID,
            senderID,
            message,
        })
        if(newMessage){
            console.log("new message ",newMessage);
            converstion.messages.push(newMessage._id)
        }
        await converstion.save()
        await newMessage.save()
        res.status(200).json({message:"message send succesfully",  newMessage  })
        
    } catch (error) {
        console.log("error at converstion controller check it ", error);
        res.status(404).json({message :"internal error " })
    }
}

module.exports ={ conversationcontoller}