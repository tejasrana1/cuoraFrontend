import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

const Home = (props) => {
  // const socket = io("http://localhost:4000");
  // socket.on("connect", () => {
  //   console.log(socket.id);
  // });
  var navigate = useNavigate();
  const [user, setUser] = useState({ name: "" });
  useEffect(() => {
    $.post("http://localhost:4000/user", {
      user: localStorage.getItem("cuoraId"),
    })
      .done((res) => {
        setUser(res.data);
      })
      .fail((e) => {
        console.log(e);
      });
  }, []);
  function logout(e) {
    e.preventDefault();
    props.loggedIn(false);
    localStorage.removeItem("cuoraId");
    navigate("login");
  }
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>logout</button>
      <button>
        <Link to="/createN">Create Namespace</Link>
      </button>
    </div>
  );
};

export default Home;
