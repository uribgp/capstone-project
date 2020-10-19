import React from 'react';
import {Route} from 'react-router-dom';
import LoginContainer from './components/Login/Login.container';
import VideoPlayerContainer from './components/Video/VideoPlayer.container';
import HomepageGuestContainer from './components/HomePage/HomepageGuest.container';
import Container from './components/Shared/Container/Container';
import ProfileContainer from './components/Profile/Profile.container'
export default function PublicRoutes() {

  return (
    <>
    <Container>
      <Route exact path="/" component={HomepageGuestContainer} />
      <Route exact path="/dashboard/guest" component={HomepageGuestContainer} />
      <Route exact path="/login" component={LoginContainer} />
      <Route exact path ="/video/:id" component={VideoPlayerContainer} />
      <Route path="/profile/:id" exact component={ProfileContainer} />
    </Container>
    </>
  )
}
