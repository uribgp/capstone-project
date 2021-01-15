import React, { ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/root-reducer";
import Container from "../Container/Container";
import FullscreenModal from "../FullscreenModal/FullscreenModal/FullscreenModal";
import LoginModalContainer from "../LoginModal/LoginModal.container";
import SignupModalContainer from "../SignupModal/SignupModal.container";
import Navbar from "./Navbar";
import { UserLogout } from '../../../redux/user/user-actions';
import Button from '../Button/Button';

interface Props {}

export default function NavbarContainer({}: Props): ReactElement {
  const dispatch = useDispatch()
  const [activeModalToggle, setActiveModalToggle] = useState<
    "sign-in" | "sign-up" | "none"
  >("none");
  const { authenticated, avatar } = useSelector(({ user }: RootState) => user);

  const toggleNavbarModal = (toggleChoice: typeof activeModalToggle) => {
    setActiveModalToggle(toggleChoice);
  };

  useEffect(() => {
    if (authenticated) {
      setActiveModalToggle("none");
    }
  }, [authenticated]);

  return (
    <div>
      <Container>
        <Navbar
          onSignInClick={() => toggleNavbarModal("sign-in")}
          onSignUpClick={() => toggleNavbarModal("sign-up")}
          authenticated={authenticated}
          userAvatar={avatar}
        />
        <Button onClick={() => dispatch(UserLogout())}>Log Out</Button>
      </Container>
      {activeModalToggle === "sign-in" && (
        <FullscreenModal
          backgroundType="transparent"
          onOutsideClick={() => toggleNavbarModal("none")}
          onCloseClick={() => toggleNavbarModal("none")}
        >
          <LoginModalContainer />
        </FullscreenModal>
      )}

      {activeModalToggle === "sign-up" && (
        <FullscreenModal
          backgroundType="transparent"
          onCloseClick={() => toggleNavbarModal("none")}
          onOutsideClick={() => toggleNavbarModal("none")}
        >
          <SignupModalContainer
            onSignupSuccess={() => toggleNavbarModal("none")}
          />
        </FullscreenModal>
      )}
    </div>
  );
}
