import React from 'react';
import { connect } from 'react-redux';
import {Redirect, Route} from 'react-router-dom'
import Profile from './pages/Profile'
// import LoginContainer from './components/Login/Login.container';

function PrivateRoutes({authenticated}) {
  
  if(authenticated) {
    return (
      <>
      </>
    );

  } else {
    return <Redirect to="/" />
  }
} 

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(PrivateRoutes)
