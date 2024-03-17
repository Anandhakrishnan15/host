import React from "react";
import "./MessageClouse.css";
import { AuthUser } from "../../../AuthContext/AuthProvider";
import userConverston from "../../../Zustand/userConversations";
const Message = ({messages}) => {
  const { user } = AuthUser();
  const { selectedConversation } = userConverston();
  const fromME = messages.senderID === user._id;
  const whoSend = fromME ? "reply" : "send";
  const profilID = fromME ? user.username : selectedConversation.username;
  const messageCloudeHolder = fromME ? "cloudred" : "cloudblue";

  return (
    <div className={`${messageCloudeHolder}`}>
      <div className="messageCloudeHolder">
        <div className="cloudeSendeOrResive">
          <div className="clousename">{profilID}</div>
          <div className="cloudemessage">{messages.message}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
