import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Login from '../../Login/Login';
import LoginContainer from '../../Login/Login.container';
import SignUpContainer from '../../Login/Signup.container';
import FullscreenModal from '../FullscreenModal/FullscreenModal';
import Navbar from './Navbar';
import NavbarAuth from './NavbarAuth';

export default function NavbarContainer() {
  const [toggleSignInModal, setToggleSignInModal] = useState(false);
  const [toggleSignUpModal, setToggleSignUpModal] = useState(false);

  const { authenticated, id: userId, avatar: avatar} = useSelector((state) => state.user);

  const handleOnSignInClick = () => {
    setToggleSignInModal(!toggleSignInModal);
  };

  const handleOnSignUpClick = () => {
    setToggleSignUpModal(!toggleSignUpModal);
  };

  const login = () => {};

  if (authenticated) {

    return <NavbarAuth userId={userId} userImage={avatar} />;
  } else {
    return (
      <div className="navbar-wrap">
        <Navbar
          onSignInClick={handleOnSignInClick}
          onSignUpClick={handleOnSignUpClick}
        />
        {toggleSignInModal && (
          <FullscreenModal
            onOutsideClick={handleOnSignInClick}
            onCloseClick={handleOnSignInClick}
          >
            <LoginContainer />
          </FullscreenModal>
        )}

        {toggleSignUpModal && (
          <FullscreenModal
            onOutsideClick={handleOnSignUpClick}
            onCloseClick={() => {
              console.log('hello');
              handleOnSignUpClick();
            }}
          >
            <SignUpContainer onSignUpSuccess={() => setToggleSignUpModal(false)} />
          </FullscreenModal>
        )}
      </div>
    );
  }
}
