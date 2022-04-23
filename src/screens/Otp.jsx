import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from "jquery";
const Otp = () => {
  var navigate = useNavigate();
  const [email, setEmail] = useState("");
  function changeHandler(e) {
    setEmail(e.target.value);
    // console.log(email);
  }
  function clickHandler(e) {
    e.preventDefault();
    // if (email.endsWith("cuchd.in"))
    $.post("http://localhost:4000/", { email })
      .done((res) => {
        console.log(res);
        navigate("/otp_validation", { state: { email } });
      })
      .fail((e) => {
        console.log(e);
      });
    // else alert("Sorry...Only CU students are allowed");
  }
  return (
    <div>
      <form onSubmit={clickHandler}>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={changeHandler}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Otp;
