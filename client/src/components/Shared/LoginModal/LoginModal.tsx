import React, { ReactElement } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Label from "../Label/Label";
import TitleBig from "../Typography/TitleBig";
import "./login-modal.style.scss";
import buttonStyles from "../Button/button.module.scss";
interface Props {
  onEmailChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onDemoClick: () => void;
  onLoginClick: () => void;
  emailValue: string;
  passwordValue: string;
}

export default function LoginModal({
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  emailValue,
  passwordValue,
  onDemoClick,
}: Props): ReactElement {
  return (
    <div className="login-modal">
      <div className="login-modal-input-wrap">
        <Label text="Email" />
        <Input
          value={emailValue}
          onChange={(event) => onEmailChange(event)}
          placeholder="Email"
        />
      </div>
      <div className="login-modal-input-wrap">
        <Label text="Password" />
        <Input
          value={passwordValue}
          onChange={(event) => onPasswordChange(event)}
          placeholder="Password"
          type="password"
        />
      </div>
      <Button
        uniqueStyle={`${buttonStyles.baseButtonPrimary} ${buttonStyles.baseButton}`}
        fullWidth={true}
        onClick={() => onLoginClick()}
      >
        Sign in
      </Button>
      <Button
        onClick={onDemoClick}
        uniqueStyle={`${buttonStyles.baseButtonPrimaryOutline} ${buttonStyles.baseButton}`}
        fullWidth={true}
      >
        Try Demo
      </Button>
    </div>
  );
}
