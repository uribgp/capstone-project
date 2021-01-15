import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import IndexContainer from './components/Home/Index.container';
import SignupContainer from './components/Signup/Signup.container';
import VideoDashboardContainer from './components/VideoDashboard/VideoDashboard.container';
import VideoUploadContainer from './components/VideoUpload/VideoUpload.container';
import VideoViewerContainer from './components/VideoViewer/VideoViewer.container';
import { userValidate } from './redux/user/user-actions';
import NutritionContainer from './components/NutritionDashboard/Nutrition.container';
import Payment from './components/Payments/Payment';
interface Props {}

export default function PublicRoutes({}: Props): ReactElement {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(userValidate())
  }, [])


  return (
    <>
      <Route path="/" exact component={VideoDashboardContainer} />
      <Route path="/video/:id" exact component={VideoViewerContainer} />
      <Route path="/upload" exact component={VideoUploadContainer}  />
      <Route path="/home" exact component={IndexContainer} />
      <Route path="/sign-up" exact component={SignupContainer} />
      <Route path="/nutrition" exact component={NutritionContainer} />
      <Route path="/payment" exact component={Payment} />
    </>
  );
}
