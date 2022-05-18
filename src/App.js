import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  NavLink,
} from "react-router-dom";
import "./App.css";
import $ from "jquery";
import { io } from "socket.io-client";

import Otp from "./screens/Otp";
import OtpValidation from "./screens/OtpValidation";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Home from "./screens/Home";
import TestPage from "./screens/TestPage";
import CreateNamespace from "./screens/CreateNamespace";
import ChatScreen from "./screens/ChatScreen";
import Details from "./components/Details";
import Video from "./videoPlayer/App";
import JoinNamespace from "./screens/JoinNamspace";

import NavBar from "./components/NavBar";
import Content from "./components/Content";

function App() {
  const [user, setUser] = useState({ name: "" });
  const socket = io("http://localhost:4000");
  const [namespace, setNamespace] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  useEffect(async () => {
    if(localStorage.getItem("cuoraId"))
    await $.post("http://localhost:4000/user", {
      user: localStorage.getItem("cuoraId"),
    })
      .done((res) => {
        setUser(res.data);
        setNamespace(res.data.namespaces)
      })
      .fail((e) => {
        console.log(e);
      });
        if(localStorage.getItem("cuoraId"))
        if(user.permission === "admin")
        $.get("http://localhost:4000/namespace")
          .done((res) => {
            console.log(res.data);
            setNamespace(res.data);
          })
          .fail((e) => {
            console.log(e);
          });
        if (localStorage.getItem("cuoraId")) setLoggedIn(true);
        else if (localStorage.getItem("cuoraOtp")) setEmailVerified(true);
  }, [loggedIn]);
  function mappedNamespaces(el) {
    function joinNamespace() {
      socket.emit("namespace", { name: el.name });
    }
    return (
      <NavLink
        onClick={joinNamespace}
        exact
        className="navLink"
        to={"/" + el.name}
        activeClassName="active">
        {el.name}
      </NavLink>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          className="NavBar "
          styles={{
            backgroundColor: "black",
          }}>
          {namespace.map(mappedNamespaces)}
        </NavBar>
        <Content
          className="content"
          styles={{
            backgroundColor: "grey",
            overflowX: "hidden",
            position: "relative",
            flex: 6,
          }}>
          <Routes>
            <Route
              exact
              index
              element={
                !loggedIn ? (
                  <Navigate replace to="/login" />
                ) : (
                  <Home loggedIn={setLoggedIn} user={user} />
                )
              }
            />
            <Route
              exact
              path="/login"
              element={
                loggedIn ? (
                  <Navigate replace to="/" />
                ) : (
                  <Login setUser={setUser} loggedIn={setLoggedIn} />
                )
              }
            />
            <Route
              exact
              path="/otp"
              element={
                loggedIn ? (
                  <Navigate replace to="/" />
                ) : emailVerified ? (
                  <Navigate replace to="/register" />
                ) : (
                  <Otp />
                )
              }
            />
            <Route exact path="/otp_validation" element={<OtpValidation />} />
            <Route exact path="/test" element={<TestPage />} />
            <Route exact path="/createN" element={<CreateNamespace user={user} />} />
            <Route exact path="/details" element={<Details />} />
            <Route exact path="/video" element={<Video />} />
            <Route exact path="/:name" element={<ChatScreen user={user} />} />
            <Route exact path="/join/:name/:id" element={<JoinNamespace user={user} />} />
            <Route
              exact
              path="/register"
              element={loggedIn ? <Navigate replace to="/" /> : <Register  />}
            />
            {/* <Route exact path="/history" element={} />
            <Route exact path="/profile" element={} />
            <Route exact path="/advance" element={} />
            <Route path="/history/:id" element={} />
            <Route path="/remove/:id" element={} />  */}
          </Routes>
        </Content>
      </BrowserRouter>
    </div>
  );
}

export default App;
