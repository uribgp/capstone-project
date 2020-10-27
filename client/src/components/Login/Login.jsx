import React from 'react';
import Button from '../Shared/Button/Button';
import Input from '../Shared/Input/Input';
import {AiOutlineUser, AiOutlineLock} from 'react-icons/ai'
export default function Login({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLoginClick,
  onDemoClick,
  error
}) {
  return (
    <div className="login-modal">
      <div>
        <Input icon={<AiOutlineUser />} value={email} onChange={onEmailChange} placeholder={'Email'} />
        <Input
          type="password"
          icon={<AiOutlineLock />}
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
      </div>
      <div className="login-modal-button-wrap">
        <Button onClick={onLoginClick} text="Login" />
        <Button onClick={onDemoClick} text="Demo" />
      </div>
      {error && <div>Could not sign in</div>}
    </div>
  );
}
