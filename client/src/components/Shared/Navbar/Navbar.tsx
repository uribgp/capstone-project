import React, { ReactElement } from "react";
import Button from "../Button/Button";
import Logo from "../../../media/pp.svg";
import styles from "./navbar.module.scss";
import buttonStyle from "../Button/button.module.scss";
import Image from "../Image/Image";
import { Link } from "react-router-dom";
import UserProfile from "../UserProfile/UserProfile";
interface Props {
  onSignInClick: () => void;
  onSignUpClick: () => void;
  authenticated: boolean;
  userAvatar: string;
}
export default function Navbar({
  onSignInClick,
  onSignUpClick,
  authenticated,
  userAvatar,
}: Props): ReactElement {
  console.log(styles.navbar);

  return (
    <div className={`${styles.navbar} navbar`}>
      <Image className="navbar-logo" src={Logo} alt="Posture Perfect Logo" />
      <div className="navbar-right">
        {!authenticated ? (
          <div>
            <Button
              uniqueStyle={`${buttonStyle.baseButton} ${buttonStyle.baseButtonPrimary}`}
              onClick={() => onSignInClick()}
            >
              Sign in
            </Button>

            <Button
              uniqueStyle={`${buttonStyle.baseButton} ${buttonStyle.baseButtonPrimaryOutline}`}
              onClick={() => null}
            >
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        ) : (
          <div>
            <UserProfile size="medium" src={userAvatar} alt="User Profile" />
          </div>
        )}
      </div>
    </div>
  );
}
