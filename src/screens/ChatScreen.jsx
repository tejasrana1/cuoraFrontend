import React, { useState, useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import $ from "jquery"


const ChatScreen = (props) => {
  const [id, setId] = useState("")
  const { name } = useParams();
  var socket = io(`http://localhost:4000/`);
  const [messages, setMessages] = useState([]);
  useEffect(()=>{
    console.log(name);
    $.post("http://localhost:4000/chatHistory", {name})
    .done(res=>{
      setMessages(res.messages)
      console.log(res.id);
      setId(res.id)
    })
    .fail(e=>{
      console.log(e);
    })
    // setMessages([])
    socket.connect();
  },name,socket)
  useEffect(()=>{
    socket.on("connect", () => {
      console.log(socket.id);
      socket.emit("name", {name: localStorage.getItem("cuoraId")})
    });
    socket.on("messageFromServer", (list) => {
      // console.log(socket.id);
      // console.log(list.messages);
      setMessages(prev=> [...prev, list.message]);
  })
  socket.on("chatHistory", (msgs)=>{
    setMessages(msgs.messages)
  })
  },[])
  const [msg, setMsg] = useState("");
  function handleChat(event) {
    event.preventDefault();
    console.log(name);
    socket.emit("newMessage", { message: msg, user: props.user.name, namespace: name, date: new Date() });
    setMsg("");
  }
  function handleMsgChange(e) {
    setMsg(e.target.value);
  }
  function mappedMessages(message, ix) {
    function deleteMsg(){
      if(window.confirm("Do you want to save changes?") == true){
        $.post("http://localhost:4000/deleteMsg", {message: message, namespace: name})
        // .done(res=>{
        //   setMessages(res.data)
        // })
        // .fail(e=>{
        //   console.log(e);
        // })
      console.log(message);
      }
    }
    if(message.namespace === name)
    return <div key={ix}><p>{message.user}
     {(message.user === props.user.name) && <button onClick={deleteMsg}>delete</button>}
      </p><p>{message.date}</p><h3>{message.message}</h3></div>
  }
  function deleteNamespace(){
    if(window.confirm("Are you sure you want to delete ", name))
    $.post("http://localhost:4000/deleteNamespace", {name})
  }
  function generateLink(){
    console.log(name);
    window.prompt("Copy to clipboard: Ctrl+C, Enter", `http:localhost:3000/join/${name}/${id}`);
  }
  return (
    <div>
      {name}
      {props.user.permission === "admin" && <div>
        <button onClick={deleteNamespace}>delete</button>
        <button onClick={generateLink}>generate link</button>
        </div>}
      
      {messages.map(mappedMessages)}
      <form onSubmit={handleChat}>
        <input type="text" name="msg" value={msg} onChange={handleMsgChange} />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default ChatScreen;
