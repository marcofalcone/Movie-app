import React from 'react';
import homeLogo from '../assets/logo.svg';
import '../styles/Login.css';

const LoginPage = () => {
  return (
    <div className='loginWrapper'>
      <img className='loginLogo' src={homeLogo} alt="" />
      <form className='loginBox'>
        <p className='loginTitle'>SIGN IN</p>
        <input type="email" placeholder='Email' />
        <input type="password" placeholder='Password' />
        <button className='signIn'>
          Sign in
        </button>
        <p className='register'>
          Register
        </p>
        <p className='forgot'>
          Forgot password?
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
