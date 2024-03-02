import React, { useEffect } from 'react'
import { AuthUser } from '../../AuthContext/AuthProvider';
import "./ChatBoc.css"
import userConverston from '../../Zustand/userConversations';

const ChatBoxSiderBar = ({conversations,conId}) => {
    const {selectedConversation,setSelectedConversation} = userConverston()
    const isselected =  selectedConversation?._id===conversations._id
    // console.log("is this selected ", isselected);
  return (
    <>
     <div className={`tosendHolder ${isselected? "toSendHoldeSelected": ""}`} onClick={()=>setSelectedConversation(conversations)}  >
             <div className="tosendUsericon">
               <img src="" alt={conId}/>
             </div>
             <div className="toSendUserName">
               <h5>{conversations.username}</h5>
               <h5>{conversations.email} </h5>
             </div>
             {/* <div></div> */}
           </div>
    </>

    // <>
    //     <div className="chatboxSideBar">
    //       {getAllusers.map((conversation, convestaionIndex) => {
    //         return (
    //           <div className={`tosendHolder ${isSelected ?"toSendHoldeSelected":""}`} key={convestaionIndex}
    //           onClick={()=>setSelectedConversation(getAllusers)}
    //           >
    //             <div className="tosendUsericon">
    //               <img src="" alt={conversation._id} />
    //             </div>
    //             <div className="toSendUserName">
    //               <h5>{conversation.username}</h5>
    //               <h5>{conversation.email}</h5>
    //             </div>
    //             {/* <div></div> */}
    //           </div>
    //         );
    //       })}
    //     </div>
    // </>
  )
}

export default ChatBoxSiderBar