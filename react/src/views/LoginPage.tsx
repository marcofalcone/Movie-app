import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import homeLogo from '../assets/logo.svg'
import { notifyError } from '../components/Alert'
import '../styles/Login.css'
import { loginSchema } from '../utils/schema'

const LoginPage = ({ setIsLogged }: { setIsLogged: (prop: boolean) => void }): JSX.Element => {
  const [form, setForm] = useState({})

  const checkCredentials = async (): Promise<void> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }
    const res = await (await fetch('/api/users/login', requestOptions)).json()
    if (res?.code === 1) {
      setIsLogged(true)
      localStorage.setItem('user', JSON.stringify({
        accessToken: res.accessToken,
        user: res.user
      }))
    } else if (res?.code === 0) {
      notifyError(res?.message)
    } else if (res?.code === 2) {
      notifyError(res?.message)
    } else {
      notifyError()
    }
  }

  const validateForm = async (): Promise<boolean> => {
    let isValid
    try {
      await loginSchema.validate(form, { abortEarly: false })
      isValid = true
    } catch (err: any) {
      isValid = false
      err?.inner?.map((err: { message: string }) => notifyError(err.message))
    }
    return isValid
  }

  const handleOnClick = async (): Promise<void> => {
    const isFormValid = await validateForm()
    if (isFormValid) {
      void checkCredentials()
    }
  }

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
          e?.preventDefault()
          void handleOnClick()
        }} className='formButton'>
          Sign in
        </button>
        <Link to={{
          pathname: '/register'
        }}>
          <p className='register'>
          New user?
          </p>
        </Link>
      </form>
    </div>
  )
}

export default LoginPage
