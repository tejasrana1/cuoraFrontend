import React, { useEffect, useState } from "react";
import $ from "jquery";

function Register() {
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    email: localStorage.getItem("cuoraOtp"),
    address: "",
    uid: "",
    password: "",
    cpass: "",
  });
  useEffect(() => {
    $.post("http://localhost:4000/email_after_otp", {
      id: localStorage.getItem("cuoraOtp"),
    })
      .done((res) => {
        setInfo((prev) => {
          return {
            ...prev,
            email: res.data,
          };
        });
      })
      .fail((e) => {
        console.log(e);
      });
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setInfo((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    console.log(info);
    if (info.cpass === info.password)
      $.post("http://localhost:4000/register", {
        info,
        deletable: localStorage.getItem("cuoraOtp"),
      })
        .done((res) => {
          console.log(res);
          localStorage.removeItem("cuoraOtp");
          localStorage.setItem("cuoraId", res.data._id);
        })
        .fail((e) => {
          console.log(e.responseJSON.error.message);
        });
    else console.log("Password Don't Match");
  }
  return (
    <div>
      Register
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          disabled
          name="email"
          value={info.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="uid"
          value={info.uid}
          onChange={handleChange}
          placeholder="UID"
        />
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="tel"
          name="phone"
          value={info.phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={info.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="password"
          name="password"
          value={info.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <input
          type="password"
          name="cpass"
          value={info.cpass}
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
