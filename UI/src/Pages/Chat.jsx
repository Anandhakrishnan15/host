import React, { useEffect } from 'react'
import ChatBox from '../Components/MainChatArea/ChatBox'
import { AuthUser } from '../AuthContext/AuthProvider'

const Chat = () => {
  const {user} =AuthUser()
  useEffect(()=>{
    if(user){
      console.log('user data',user);
    }
  },[user])
 
  return (
    <div><h1>main page </h1>
    <h4>{user ? `hello ${user.username} `:`helloooo`}  </h4>
   
     <ChatBox/>
    </div>
  )
}

export default Chat