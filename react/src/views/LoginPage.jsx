import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import homeLogo from '../assets/logo.svg';
import Alert from '../components/Alert';
import '../styles/Login.css';
import { loginSchema } from '../utils/schema';

const LoginPage = ({ setIsLogged }) => {
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
      localStorage.setItem('user', JSON.stringify({
        accessToken: resJson.accessToken,
        user: resJson.user,
      }));
    } else if (resJson.code === 0) {
      notifyError(resJson.message);
    } else if (resJson.code === 2) {
      notifyError(resJson.message);
    } else {
      notifyError();
    }
  };

  const validateForm = async () => {
    let isValid;
    try {
      isValid = await loginSchema.validate(form, { abortEarly: false });
    } catch (err) {
      isValid = false;
      err?.inner?.map((err) => notifyError(err.message));
    }
    return isValid;
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
        <button onClick={async(e) => {
          e?.preventDefault();
          const isFormValid = await validateForm();
          if (isFormValid) {
            checkCredentials();
          } else null;
        }} className='formButton'>
          Sign in
        </button>
        <Link to={{
          pathname: '/register',
        }}>
          <p className='register'>
          New user?
          </p>
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
