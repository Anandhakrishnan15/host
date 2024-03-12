const Conversation = require("../ModulesMongooes/converasation_module");
const Message = require ("../ModulesMongooes/message_module")
const conversationcontoller = async (req,res)=>{
     //now we will stoer the messages and the cnvestion betten the users
    try {
        // console.log("hellooo");
        // get the message,senders Id and resiversId and store that in the database
        const {message} = req.body;//the mssge from th body 
        const {id:resiversID} =req.params//the resivers id from the parms
        const senderID =req.data._id//the senders id from the datavrifiction  
    //   console.log(message,resiversID,senderID);
        // now create a convestion colletion if the is not created between the sender and resiver
        let conv= await Conversation.findOne({
            particepitaion:{$all:[senderID,resiversID]},
        })
      
        // if a cconverstion id not there maek anew converstion
        if(!conv){
           conv= await Conversation.create({
             particepitaion:[senderID,resiversID],
            })
        }
        const newMessage= new Message({
            senderID,
            resiversID,
            message,
        })
        if(newMessage){
           conv.messages.push(newMessage._id)
            console.log('new messsages if ', newMessage);
        }

        //SOCKET FUNTIONALITY WILL WOREK OVER HERE

        // await converstion.save()
        // await newMessage.save()

        await Promise.all([conv.save(),newMessage.save()])
        // console.log(`senders id ${senderID},reisvers id ${resiversID},message${message}`);
        // console.log("coverdation find ",converstion);
        // console.log("new message ",newMessage);
        res.status(200).json(newMessage)

        
    } catch (error) {
        console.log("error at converstion controller check it ", error);
        res.status(404).json({message :"internal error " })
    }
}

const getMessages = async(req,res)=>{
    try {
        const {id:userToSend} = req.params
        const senderID = req.userId

        const conversaion = await Conversation.findOne({
            particepitaion:{$all:[senderID,userToSend]}
        }).populate("messages")
        if (!conversaion){
            return res.status(200).json([])
        }
        let text = conversaion.messages
        res.status(200).json(text)
        console.log(text);
    } catch (error) {
        console.log("error at getmessage controller check it ", error.message);
        res.status(404).json({message :"internal server error " })
    }
}

module.exports ={ conversationcontoller , getMessages}