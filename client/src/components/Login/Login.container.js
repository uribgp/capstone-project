import React, { useEffect } from 'react';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { authenticate, login } from '../../store/user/user-actions';
import Login from './Login';
import './login.style.scss';
function LoginContainer({login, authenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

/*   const currentUserId = useSelector((state) => state.auth.id); */


  useEffect(() => {
  if(authenticated) {
    handleOnAuthSuccess()
  }
  }, [authenticated])

  const handleOnAuthSuccess = () => {
    // re-direct here. 
  }

  const handleOnEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOnPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOnLoginClick = () => {
    login(email.toLocaleLowerCase(), password)
  };

  const handleOnDemoClick = () => {
    login("demo@demo.com", "password")
  };

  return (
    <Login
      onPasswordChange={(event) => handleOnPasswordChange(event)}
      onEmailChange={(event) => handleOnEmailChange(event)}
      onDemoClick={() => handleOnDemoClick()}
      onLoginClick={() => handleOnLoginClick()}
      email={email}
      password={password}
    />
  );
}


const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)