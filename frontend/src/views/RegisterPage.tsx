import React, { useState } from 'react'
import homeLogo from '../assets/logo.svg'
import { useHistory } from 'react-router-dom'
import '../styles/Login.css'
import { registerSchema } from '../utils/schema'
import { notifyError, notifySuccess } from '../components/Alert'

const RegisterPage = (): JSX.Element => {
  const history = useHistory()

  const [form, setForm] = useState({})

  const register = async (): Promise<void> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }
    const res = await fetch('/api/users', requestOptions)
    const resJson = await res.json()
    if (resJson.code === 1) {
      notifySuccess('User successfully registered')
      history.push('/')
    } else notifyError(resJson?.message)
  }

  const validateForm = async (): Promise<boolean> => {
    let isValid
    try {
      await registerSchema.validate(form, { abortEarly: false })
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
      void register()
    }
  }

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
          password: e?.target?.value
        })} type="password" placeholder='Password' />
        <button onClick={(e) => {
          e?.preventDefault()
          void handleOnClick()
        }} className='formButton'>
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
