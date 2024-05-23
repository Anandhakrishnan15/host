import React, { useEffect } from "react";
import ChatBoxSiderBar from "./ChatBoxSiderBar";
import { AuthUser } from "../../AuthContext/AuthProvider";

const SidebarMap = () => {
  const { getAllusers } = AuthUser();
  // const {selectedConversation,setSelectedConversation} = userConverston()
  // useEffect(() => {
  //   if (getAllusers) {
  //     console.log("all users a",getAllusers);
  //   }
  // }, [getAllusers]);
  return (
    <div className="chatboxSideBar">
      {getAllusers.map((conversation,conversayionIndex) => (
        <ChatBoxSiderBar
          key={conversayionIndex}
          conversations={conversation}
          conId={conversation._id}
        />
      ))}
    </div>
  );
};

export default SidebarMap;
