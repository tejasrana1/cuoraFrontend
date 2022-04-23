import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

const Login = (props) => {
  var navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  function handleLogin(event) {
    event.preventDefault();
    $.post("http://localhost:4000/login", {
      username: login.username,
      password: login.password,
    })
      .done((res) => {
        console.log(res);
        localStorage.setItem("cuoraId", res.data._id);
        props.loggedIn(true);
        return navigate("/");
      })
      .fail((e) => {
        console.log(e);
      });
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          value={login.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={login.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
