import React, { useEffect } from 'react';
import { useState } from 'react';
import {useHistory} from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux';
import { authenticate, login } from '../../store/user/user-actions';
import HeroImage from '../Shared/HeroImage/HeroImage';
import Login from './Login';
import './login.style.scss';
function LoginContainer({login, authenticated}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

/*   const currentUserId = useSelector((state) => state.auth.id); */
  const history = useHistory()

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
    .then((res) => history.push('/'))
  };

  return (
    <div className="login-page">
      <HeroImage image={""} />
      <Login
        onPasswordChange={(event) => handleOnPasswordChange(event)}
        onEmailChange={(event) => handleOnEmailChange(event)}
        onDemoClick={() => handleOnDemoClick()}
        onLoginClick={() => handleOnLoginClick()}
        email={email}
        password={password}
      />
    </div>
  );
}


const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password))
})


export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)