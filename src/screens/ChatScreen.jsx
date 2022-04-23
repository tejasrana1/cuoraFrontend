import React, { useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const ChatScreen = () => {
  const { name } = useParams();
  const socket = io(`http://localhost:4000/${name}`);
  const [messages, setMessages] = useState([]);
  socket.on("connect", () => {
    console.log(socket.id);
  });
  const [msg, setMsg] = useState("");
  function handleChat(event) {
    event.preventDefault();
    socket.emit("newMessage", { message: msg });
    setMsg("");
  }
  socket.on("messageList", (list) => {
    setMessages(list);
  });
  function handleMsgChange(e) {
    setMsg(e.target.value);
  }
  function mappedMessages(messsage) {
    return <p>{messsage}</p>;
  }
  return (
    <div>
      {name}
      {messages.map(mappedMessages)}
      <form onSubmit={handleChat}>
        <input type="text" name="msg" value={msg} onChange={handleMsgChange} />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ChatScreen;
