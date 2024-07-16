import React, { useEffect, useState } from 'react'
import userConverston from '../../../Zustand/userConversations'
import { AuthUser } from '../../../AuthContext/AuthProvider'


const GetUsersMessages = () => {
  const [loading,setLoading]= useState(false)
  const {selectedConversation,messages,setMessages}=userConverston()
  const {token}=AuthUser()
  useEffect(()=>{
    const getmesage = async()=>{
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:2000/message/${selectedConversation._id}`,
            {
                method:'GET',
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              })
            const data = await res.json();
            setMessages(data)
            if (!data){
              console.log('no message data there');
            }

        } catch (error) {
            console.log('getmessage error ',error);
        }
        finally{
            setLoading(false)
        }
    }
    if ( selectedConversation?._id) getmesage()

  },[selectedConversation?._id,setMessages])
  return{loading,messages}
  
}

export default GetUsersMessages