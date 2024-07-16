import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthUser, userAuth } from './AuthProvider';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers , setOnlineUsers]= useState([])
  const {userid,isLogedIn}= AuthUser()

    useEffect(()=>{
    if(userid){
      const socket =io("http://localhost:2000",{
        query:{
          userID:userid
        }
      })
      setSocket(socket)
      socket.on("getonline",(users)=>{
        setOnlineUsers(users)
      })      

      return()=>socket.close()
    }
    else{
      if(socket){
        socket.close()
        setSocket(null)
      }
    }

    },[isLogedIn])

 

 

  return (
    <SocketContext.Provider value={{socket,onlineUsers}}>
      {children}
    </SocketContext.Provider>
  );
};
