import React from "react";

function NavBar(props) {
  return (
    <div style={props.styles} className={props.className}>
      {props.children}
    </div>
  );
}

export default NavBar;
