import React from "react";

import classes from "./Button.module.css";

const Button: React.FC<{
  className: string;
  disabled: boolean;
  children: React.ReactNode;
  type: any;
}> = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
