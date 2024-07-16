import React, { useEffect, useState } from "react";
import ChatBoxSiderBar from "./ChatBoxSiderBar";
import { AuthUser } from "../../AuthContext/AuthProvider";

const SidebarMap = () => {
  const { getAllusers,setlimit,limit, totalCount } = AuthUser();
  const [loading ,setloading]= useState(false)
  const [page, setpage] = useState(false);
  
  // console.log('get all the users in side bar',getAllusers);
  // const {selectedConversation,setSelectedConversation} = userConverston()
  const increaseLimit = async() => {
   try {
    setloading(true)
    setlimit(prevLimit => prevLimit + 10);
    if(limit>=totalCount){
      return setpage(true);
    }else{
      return setpage(false);
    }
   } catch (error) {
    console.error('error in fetchinf other users try agin ',error);
    setloading(false)
   }
   finally{
    setloading(false)
   }
  }
 
  return (
    <div className="chatboxSideBar">
      {getAllusers.map((conversation,conversayionIndex) => (
        <ChatBoxSiderBar
          key={conversayionIndex}
          conversations={conversation}
          conId={conversation._id}
        />
      ))}
      {!page ? (<button onClick={increaseLimit}>{loading ?(<p>Loading...</p>):(<p>nxt</p>)}</button>):( 'no more...' )}
     
    </div>
  );
};

export default SidebarMap;
