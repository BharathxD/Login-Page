import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<{ className: string; onClick: () => void; disabled: boolean; children: React.ReactNode; type: any}> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
