import React from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';

const Home: React.FC<{onLogout: () => void}> = (props) => {
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <button onClick={props.onLogout}></button>
    </Card>
  );
};

export default Home;
