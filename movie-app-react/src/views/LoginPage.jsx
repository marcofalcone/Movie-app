import React, { useState } from 'react';
import homeLogo from '../assets/logo.svg';
import Alert from '../components/Alert';
import '../styles/Login.css';

const LoginPage = ({setIsLogged}) => {
  const {
    notifyError,
  } = Alert();

  const [form, setForm] = useState({});

  const checkCredentials = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    };
    const res = await fetch('/api/users/login', requestOptions);
    const resJson = await res.json();
    if (resJson.code === 1 && resJson.accessToken) {
      setIsLogged(true);
      localStorage.setItem('accessToken', resJson.accessToken);
    } else if (resJson.code === 0) {
      notifyError(resJson.message);
    } else if (resJson.code === 2) {
      notifyError(resJson.message);
    } else {
      notifyError();
    }
  };

  return (
    <div className='loginWrapper'>
      <img className='loginLogo' src={homeLogo} alt="" />
      <form className='loginBox'>
        <p className='loginTitle'>SIGN IN</p>
        <input onChange={(e) => setForm({
          ...form,
          username: e?.target?.value
        })} type="username" placeholder='Username' />
        <input onChange={(e) => setForm({
          ...form,
          password: e?.target?.value
        })} type="password" placeholder='Password' />
        <button onClick={(e) => {
          e?.preventDefault();
          checkCredentials();
        }} className='signIn'>
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
