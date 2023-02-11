import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

interface emailReducerState {
  value: string;
  isValid: boolean;
}
interface emailReducerAction {
  type: string;
  value: string;
}

const emailReducer = (state: emailReducerState, action: emailReducerAction) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (
  state: emailReducerState,
  action: emailReducerAction
) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login: React.FC<{
  onLogin: (email: string, password: string) => void;
}> = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });

  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const [formIsValid, setFormIsValid] = useState<boolean>(false);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     setFormIsValid(emailState.isValid && enteredPassword.trim().length > 6);
  // HTTP request
  //   }, 1000);
  //   return () => {
  //     clearTimeout(identifier);
  // It runs only after the dependency array changes
  // So when user takes a pause, this won't run
  //   };
  // }, [emailState.value, enteredPassword]); // Only be run if any of these dependencies changes

  const emailChangeHandler = (event: React.FormEvent) => {
    dispatchEmail({
      type: "USER_INPUT",
      value: (event.target as HTMLInputElement).value,
    });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event: React.FormEvent) => {
    dispatchPassword({
      type: "USER_PASSWORD",
      value: (event.target as HTMLInputElement).value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR", value: emailState.value });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "INPUT_BLUR", value: passwordState.value});
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            onClick={() => {
              return;
            }}
            disabled={!formIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
