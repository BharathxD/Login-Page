import React, { useRef, useImperativeHandle, ForwardedRef } from "react";
import classes from "./Input.module.css";

export const Input: React.FC<{
  isValid: boolean | undefined;
  type: string;
  id: string;
  value?: string;
  onChange: (e: React.FormEvent) => void;
  onBlur: () => void;
  label: string;
  ref?: React.Ref<HTMLInputElement>;
}> = React.forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const activate = () => {
    inputRef.current!.focus();
  };

  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={inputRef}
      />
    </div>
  );
});
