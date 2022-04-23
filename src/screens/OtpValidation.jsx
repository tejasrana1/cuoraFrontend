import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import $ from "jquery";

function OtpValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  function handleChange(e) {
    setOtp(e.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    $.post("http://localhost:4000/otp_validation", {
      email: location.state.email,
      otp,
    })
      .done((res) => {
        console.log(res);
        if (res.res === "matched") {
          localStorage.setItem("cuoraOtp", res.id);
          navigate("/register", { state: { email: location.state.email } });
        } else alert("Wrong OTP");
      })
      .fail((e) => {
        console.log(e);
      });
    console.log(location.state.email);
    console.log(otp);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="otp"
          value={otp}
          required
          onChange={handleChange}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default OtpValidation;
