import React, { useState } from "react";
import "./ChatBoc.css";
import axios from "axios";
import { AuthUser } from "../../AuthContext/AuthProvider";
import ChatBoxSiderBar from "./ChatBoxSiderBar";
import SidebarMap from "./SidebarMap";
import userConverston from "../../Zustand/userConversations";
import GetMessage from "./MessageArea/GetMessage";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { selectedConversation, messages,setMessages} = userConverston();
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
  const selectedconverastion = selectedConversation
  const textmessageSend = async (e) => {
    setLoading(true);
    e.preventDefault();
 
    // if (!isLogedIn) {
    //   console.log("User not authenticated");
    //   return;
    // }
    if (!message){
      alert("no text  to send")
      return setLoading(false)
  
  };
  console.log('selectedconves',selectedconverastion);
    try {
      const response = await axios.post(`http://localhost:2000/message/send/${selectedConversation._id}`,{message},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      
      );
     
      if (response.status === 200){
        console.log("Message posted successfully");
        console.log(response.data);
        // You can do additional logic after posting the message
        await setMessages([...messages,response.data])
      } else {
        console.error("Failed to post message");
      }
      // setMessages([...messages,response.data])
      // console.log(text);
      console.log(messages);
      setMessage("")
    } catch (error) {
      if (error){
        alert('message not send pay try again')
        return message
      }
      console.log("message send error :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ChatboxContainer">
      <div className="chatboxdivider">
        <SidebarMap />
        <div className="chatboxMessagearea">
          <div className="messageAreaContainer">
            
            <div className="messageResiverNavbar">{selectedconverastion? <p>{ selectedconverastion.username}</p>: ""} </div>
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
