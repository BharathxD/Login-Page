import React, { useContext } from "react";
import AuthContext from "../Store/Auth-Context";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";

const Home: React.FC = () => {
  const context = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <button onClick={context.onLogout}>Logout</button>
    </Card>
  );
};

export default Home;
