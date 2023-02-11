import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

interface reducerState {
  value: string;
  isValid: boolean | undefined;
}
interface reducerAction {
  type: string;
  value: string;
}

const emailReducer = (state: reducerState, action: reducerAction) => {
  if (action.type === "USER_INPUT") {
    return { value: action.value, isValid: action.value.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.value.includes("@") };
  }
  return { value: "", isValid: undefined };
};

const passwordReducer = (
  state: reducerState,
  action: reducerAction
) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.value.trim().length > 6 };
  }
  return { value: "", isValid: undefined };
};

const Login: React.FC<{
  onLogin: (email: string, password: string) => void;
}> = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  // const [enteredEmail, setEnteredEmail] = useState<string>("");
  // const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  // const [enteredPassword, setEnteredPassword] = useState<string>("");
  // const [passwordIsValid, setPasswordIsValid] = useState<boolean>(true);

  const [formIsValid, setFormIsValid] = useState<boolean | undefined>(false);

  // Never checks the validity again while using useEffect
  // It is to optimize useEffect
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
      // HTTP request
    }, 500);
    return () => {
      clearTimeout(identifier);
      // It runs only after the dependency array changes
      // So when user takes a pause, this won't run
    };
  }, [emailIsValid, passwordIsValid]); // Only be run if any of these dependencies changes

  const emailChangeHandler = (event: React.FormEvent) => {
    dispatchEmail({
      type: "USER_INPUT",
      value: (event.target as HTMLInputElement).value,
    });
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
    dispatchPassword({ type: "INPUT_BLUR", value: passwordState.value });
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
