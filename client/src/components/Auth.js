import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signup from '../components/Signup'
import LoginContainer from './Login/Login.container';



export default function Auth() {
  return (
    <>
      <Switch>
        <Route exact path='/login' component={LoginContainer} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </>
  )
}
