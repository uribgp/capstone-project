import React from 'react';
import {Route} from 'react-router-dom';
import LoginContainer from './components/Login/Login.container';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import Video from './pages/Video';
import Category from './pages/Category';
import VideoPlayerContainer from './components/Video/VideoPlayer.container';
import HomepageGuestContainer from './components/HomePage/HomepageGuest.container';
import Container from './components/Shared/Container/Container';

export default function PublicRoutes() {

  return (
    <>
    <Container>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/dashboard/guest" component={HomepageGuestContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path ="/user/:id" component={UserPage} />
      <Route exact path ="/video/:id" component={VideoPlayerContainer} />
      <Route exact path ="/category/:category" component={Category} />

    </Container>
    </>
  )
}
