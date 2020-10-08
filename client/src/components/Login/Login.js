import React from 'react';
import Button from '../Shared/Button/Button';
import Input from '../Shared/Input/Input';
export default function Login({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  onDemoClick,
}) {
  return (
    <div className="loginWrapper">
      <div className="login-container">
        <Input value={email} onChange={onEmailChange} placeholder={'Email'} />
        <Input
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <Button onClick={onLoginClick} text="Login" />
        <Button onClick={onDemoClick} text="Demo" />
      </div>
    </div>
  );
}