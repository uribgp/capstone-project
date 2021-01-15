import React, { ReactElement } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Label from "../Label/Label";
import "./signup-modal.style.scss";
import InputError from "../Input/InputError";
import ValidateCondition from "../ValidateCondition/ValidateCondition";
import buttonStyle from "../Button/button.module.scss";
interface Props {
  onEmailChange: (event: React.FormEvent<HTMLInputElement>) => void;
  emailValue: string;
  passwordValue: string;
  password2Value: string;
  usernameValue: string;
  onUsernameChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onPasswordChange: (event: React.FormEvent<HTMLInputElement>) => void;
  onPassword2Change: (event: React.FormEvent<HTMLInputElement>) => void;
  onSignupClick: () => void;
  usernameValidated: boolean;
  emailValidated: boolean;
  passwordValidated: boolean;
  buttonText: string;
  isButtonDisabled: boolean;
  signupError: string;
}

export default function SignupModal({
  onEmailChange,
  emailValue,
  onPasswordChange,
  onPassword2Change,
  onUsernameChange,
  onSignupClick,
  usernameValue,
  passwordValue,
  password2Value,
  usernameValidated,
  emailValidated,
  passwordValidated,
  buttonText,
  isButtonDisabled,
  signupError,
}: Props): ReactElement {
  return (
    <div className="signup-modal">
      <div className="signup-modal-input-wrap">
        <Label text="Username" />
        <Input
          value={usernameValue}
          onChange={(event) => onUsernameChange(event)}
          placeholder="Username"
        />
      </div>
      <div className="signup-modal-input-wrap">
        <Label text="Email" />
        <Input
          value={emailValue}
          onChange={(event) => onEmailChange(event)}
          placeholder="Email"
        />
      </div>
      <div className="signup-modal-input-wrap">
        <Label text="Password" />
        <Input
          value={passwordValue}
          onChange={(event) => onPasswordChange(event)}
          type="password"
          placeholder="Password"
        />
                <Input
          value={password2Value}
          onChange={(event) => onPassword2Change(event)}
          type="password"
          placeholder="Confirm Password"
        />
      </div>
      <ValidateCondition
        text="Username is longer than 3 characters"
        validated={usernameValidated}
      />
      <ValidateCondition text="Email is valid" validated={emailValidated} />
      <ValidateCondition
        text="Password is atleast 8 characters"
        validated={passwordValidated}
      />
      {signupError && <div>{signupError}</div>}
      <Button
        uniqueStyle={buttonStyle.baseButtonPrimary}
        onClick={() => onSignupClick()}
        isDisabled={isButtonDisabled}
        fullWidth={true}
      >asd</Button>
    </div>
  );
}
