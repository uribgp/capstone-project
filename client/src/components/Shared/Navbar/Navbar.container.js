import React, { useState } from 'react'
import Login from '../../Login/Login'
import LoginContainer from '../../Login/Login.container'
import SignUpContainer from '../../Login/Signup.container'
import FullscreenModal from '../FullscreenModal/FullscreenModal'
import Navbar from './Navbar'

export default function NavbarContainer() {
  const [toggleSignInModal, setToggleSignInModal] = useState(false)
  const [toggleSignUpModal, setToggleSignUpModal] = useState(false)
  
  const handleOnSignInClick = () => {
    setToggleSignInModal(!toggleSignInModal)
  }

  const handleOnSignUpClick = () => {
    setToggleSignUpModal(!toggleSignUpModal)
  }

  const login = () => {

  }

  return (
   <div className="navbar-wrap">
     <Navbar onSignInClick={handleOnSignInClick} onSignUpClick={handleOnSignUpClick} />
    {toggleSignInModal && 
    <FullscreenModal onOutsideClick={handleOnSignInClick} onCloseClick={handleOnSignInClick}>
      <LoginContainer  />
    </FullscreenModal>
    }
    {toggleSignUpModal && 
    <FullscreenModal onOutsideClick={handleOnSignUpClick} onCloseClick={() => {console.log("hello"); handleOnSignUpClick()}}>
      <SignUpContainer/>
    </FullscreenModal>
    }
   </div>
    
  )
}
