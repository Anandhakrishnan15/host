import React, { useEffect, useRef } from "react";
import GetUsersMessages from "./GetUsersMessages";
import Message from "./Message";
import "./MessageClouse.css";
import MessageLisinging from "./MessageLisinging";

const TextMessage = () => {
  const { messages, lodaing } = GetUsersMessages();
 MessageLisinging()
  const scrollDown = useRef()
  // when the message list change (after new message added) then scroll to the bottom of the div  with id "messageShowArea"  to show the new message
  useEffect(()=>{
    scrollDown.current?.scrollIntoView({behavior:'smooth'})
  },[messages])
 
  return (
    <div className="messageShowArea">
      {/* if not loading and the mesage lengsth is largrer than a ) and map it and show the message componant */}
      {!lodaing && messages.length >0 && messages.map((message) =>(
        <div key={message._id} ref={scrollDown}>
        <Message  messages={message}/>
        </div>
      )) }
      {/* if the loading is true then show the loading  */}
     {lodaing ? (<p>loading</p>) : ""}
     {/* if the message length is equal to 0 or a convesration was not started yet  */}
      {!lodaing && messages.length === 0 &&(
        <p>no convsration yet done start a conesrtion </p>
      )}
    </div>
  );
};

export default TextMessage;
