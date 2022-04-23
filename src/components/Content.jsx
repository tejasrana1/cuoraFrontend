import React from "react";

function Content(props) {
  return (
    <div style={props.styles} className="content">
      {props.children}
    </div>
  );
}

export default Content;
