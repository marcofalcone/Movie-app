import React, { useState } from 'react';
import homeLogo from '../assets/logo.svg';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';

const RegisterPage = () => {
  const history = useHistory();

  const [form, setForm] = useState({});

  const register = async () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    };
    const res = await fetch('/api/users', requestOptions);
    const resJson = await res.json();
    if (resJson && resJson.code === 1) {
      history.push('/');
    }
  };

  return (
    <div className='loginWrapper'>
      <img className='loginLogo' src={homeLogo} alt="" />
      <form className='loginBox'>
        <p className='loginTitle'>REGISTER</p>
        <input onChange={(e) => setForm({
          ...form,
          username: e?.target?.value
        })} type="username" placeholder='Username' />
        <input onChange={(e) => setForm({
          ...form,
          email: e?.target?.value
        })} type="email" placeholder='Email' />
        <input onChange={(e) => setForm({
          ...form,
          password: e?.target?.value
        })} type="password" placeholder='Password' />
        <button onClick={(e) => {
          e?.preventDefault();
          register();
        }} className='formButton'>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
