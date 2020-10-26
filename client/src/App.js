import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './components/Shared/Layout/Layout';
import LoadingSpinner from './components/Shared/LoadingSpinner/LoadingSpinner';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
// import { setUser } from './store/auth';
import { authenticate, login } from './store/user/user-actions';

function App({ authenticateUser, userLoading, userAuthenticated }) {
  let dispatch = useDispatch()
  // useEffect(() => {
  //   authenticateUser();
  // }, []);
  // if userAuthenticated then onConnect emit message asking for notifications, on response get the informations
  // pass userId on response get the notifications, dispatch a user patch to set notification to true

  // import checkAuthenticated, useEffect to fire it off and return the user if authenticated.  

  useEffect(() => {
    dispatch(authenticate())
  })


  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
    <Layout>
      <Switch>
        <PublicRoutes />
        <PrivateRoutes />
      </Switch>
    </Layout>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => ({
  userLoading: state.user.loading,
  userAuthenticated: state.user.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: () => dispatch(authenticate()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
