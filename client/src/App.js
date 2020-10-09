import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';
import LoadingSpinner from './components/Shared/LoadingSpinner/LoadingSpinner';
import Pages from './pages/Pages';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { setUser } from './store/auth';
import { authenticate, login } from './store/user/user-actions';

function App({ authenticateUser, userLoading, userAuthenticated }) {
  // useEffect(() => {
  //   authenticateUser();
  // }, []);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoutes />
        <PrivateRoutes />
      </Switch>
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
