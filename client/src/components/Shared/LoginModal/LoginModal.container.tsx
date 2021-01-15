import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../../redux/user/user-actions";
import LoginModal from "./LoginModal";
interface Props {}

export default function LoginModalContainer({}: Props): ReactElement {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleOnEmailChange = (event: React.FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handleOnPasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleOnDemoClick = () => {
    dispatch(userLogin("demo@demo.com", "password"));
  };

  const handleOnLoginClick = () => {
    dispatch(userLogin(email.toLocaleLowerCase(), password));
  };

  return (
    <LoginModal
      onDemoClick={handleOnDemoClick}
      emailValue={email}
      passwordValue={password}
      onLoginClick={handleOnLoginClick}
      onEmailChange={(event) => handleOnEmailChange(event)}
      onPasswordChange={(event) => handleOnPasswordChange(event)}
    />
  );
}
