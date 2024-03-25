import React, { useEffect } from 'react'
import { useSocket } from '../../../AuthContext/SocketContex'
import userConverston from '../../../Zustand/userConversations';


const MessageLisinging = () => {
    const {socket}=useSocket()
    const { messages, setMessages} = userConverston();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            setMessages([...messages,newMessage])
        })
        return ()=> socket.off("newMessage")
    },[socket,messages,setMessages])

}

export default MessageLisinging