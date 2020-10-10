import React from 'react';
import {Route} from 'react-router-dom';
import LoginContainer from './components/Login/Login.container';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Video from './pages/Video';
import Category from './pages/Category';

export default function PublicRoutes() {

  return (
    <>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path ="/user/:id" component={UserPage} />
      <Route exact path ="/video/:id" component={Video} />
      <Route exact path ="/category/:category" component={Category} />
    </>
  )
}
