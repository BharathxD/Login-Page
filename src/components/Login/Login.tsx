import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../Store/Auth-Context";
import { Input } from "./Input";

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

const passwordReducer = (state: reducerState, action: reducerAction) => {
  if (action.type === "USER_PASSWORD") {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: action.value.trim().length > 6 };
  }
  return { value: "", isValid: undefined };
};

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

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
  //? Always add everything used in useEffect as a dependency array

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
    if (formIsValid) {
      context.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current?.focus();
    } else {
      passwordInputRef.current!.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          type={"email"}
          id={"email"}
          label={"Email"}
          isValid={emailIsValid}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          type={"password"}
          id={"password"}
          label={"Password"}
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
