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
{
  /* <div className='loginWrapper'>
<div className="loginContainer">
  <div id='loginLabel'>
    Log in
  </div>
  <form className='loginContainer__form' onSubmit={handleSubmit}>
    <div>
      <span style={{ color: 'red' }}>{noEmail}</span>
      <input type='email' className={emailDiv} name='email' value={email} placeholder="Email" onChange={e => setEmail(e.target.value)} />
    </div>
    <div>
      <input type='password' className={passwordDiv} name='password' value={password} placeholder='Password' onChange={e => setPassword(e.target.value)} />
    </div>
    <span style={{ color: 'red' }}>{noPassword}</span>
    <div>
      <button type='submit' className='loginContainer__loginButton'>Log in</button>
    </div>
    <button className='loginContainer__loginButton' onClick={demo}>Demo Log in</button>
  </form>
  <div id='redirect'>
    New to Kickstarter? <Link to="/signup" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }} > Sign up </Link>
  </div>
</div>
</div> */
}
