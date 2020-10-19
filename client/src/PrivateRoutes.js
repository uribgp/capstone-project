import React from 'react';
import { connect } from 'react-redux';
import {Redirect, Route} from 'react-router-dom'
import LoginContainer from './components/Login/Login.container';
import ProfileContainer from './components/Profile/Profile.container'
function PrivateRoutes({authenticated}) {
  
  if(authenticated) {
    return (
      <> 
      <Route path="/profile/:id" exact component={ProfileContainer} />
      </>
    );

  } else {
    return <Redirect to="/" />
  }
} 



export default PrivateRoutes