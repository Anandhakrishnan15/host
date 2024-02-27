import React, { useState } from "react";
import "./ChatBoc.css";
import axios from "axios";

const ChatBox = () => {
  const [text,setText] = useState({
    message: '',
  });
  
  const textmessagecontroller = (e) => {
    console.log(e);
    let name= e.target.name;
    let value = e.target.value;
    setText({
      ...setText,
      [name]:value,
    });
  };

  const textmessageSend= async(e)=>{
    e.preventDefault()
    try {
      console.log(text);
    console.log('message send here');
      
    } catch (error) {
      console.log("message send error :",error);
    }
  }

  return (
    <div className="ChatboxContainer">
      <div className="chatboxdivider">
        <div className="chatboxSideBar">
          <div className="tosendHolder">
            <div className="tosendUsericon">
              <img src="" alt="usering" />
            </div>
            <div className="toSendUserName">
              <h5>donbo</h5>
            </div>
            {/* <div></div> */}
          </div>
        </div>
        <div className="chatboxMessagearea">
          <div className="messageAreaContainer">
            <div className="messageResiverNavbar">njknjnjn</div>
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
                    onChange={textmessagecontroller}
                    value={text.text}
                   
                  />
                  <button type="submit"></button>
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
