import React, { useState } from "react";
import "./ChatBoc.css";
import axios from "axios";
import { AuthUser } from "../../AuthContext/AuthProvider";
import ChatBoxSiderBar from "./ChatBoxSiderBar";
import SidebarMap from "./SidebarMap";
import userConverston from "../../Zustand/userConversations";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation } = userConverston();
  const [loading, setLoading] = useState(false);
  const { isLogedIn, token } = AuthUser();

  // const textmessagecontroller = (e) => {
  //   console.log(e);
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setText({
  //     ...text,
  //     [name]: value,
  //   });
  // };

  const textmessageSend = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!isLogedIn) {
      console.log("User not authenticated");
      return;
    }
    if (!message){
      alert("no text  to send")
      return setLoading(false)
  
  };

    try {
      const response = await axios.post(
        `http://localhost:2000/message/send/${selectedConversation._id}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Message posted successfully");
        console.log(response);
        // You can do additional logic after posting the message
      } else {
        console.error("Failed to post message");
      }
      // console.log(text);
      // console.log("message send here");
    } catch (error) {
      console.log("message send error :", error);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="ChatboxContainer">
      <div className="chatboxdivider">
        <SidebarMap />
        <div className="chatboxMessagearea">
          <div className="messageAreaContainer">
            <div className="messageResiverNavbar"></div>
            <div className="messageShowArea">
              <p>nasldnals</p>
              <p>janldsjfnasldjn</p>
            </div>
            <div className="textbarHolder">
              <div className="textbar">
                <form onSubmit={textmessageSend}>
                  <input
                    type="text"
                    name="message"
                    id="message"
                    autoComplete="off"
                    placeholder="text here..."
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                  <button type="submit">
                    {loading ? <p>sending</p> : <p>send</p>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
