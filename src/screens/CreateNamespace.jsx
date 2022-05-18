import React, { useState } from "react";
import $ from "jquery";

const CreateNamespace = (props) => {
  const [name, setName] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // console.log(name);
    if(props.user.permission === "admin")
    $.post("http://localhost:4000/newNamespace", { name })
      .done((res) => {
        console.log(res);
      })
      .fail((e) => {
        console.log(e);
      });
      else
      alert("Sorry. You don't have permission.")
  }
  function handleChange(e) {
    setName(e.target.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Namespace Name"
          onChange={handleChange}
          value={name}
          required
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreateNamespace;
