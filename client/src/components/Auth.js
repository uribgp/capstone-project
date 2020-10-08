import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginContainer from './Login/Login.container';
import Signup from '../components/Signup'



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
