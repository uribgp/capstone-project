import React from 'react'
import { connect } from 'react-redux'
import {Route} from 'react-router-dom'
import LoginContainer from './components/Login/LoginContainer'
import HomePage from './pages/HomePage'
export default function PublicRoutes() {

  return (
    <>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={LoginContainer} />
    </>
  )
}
