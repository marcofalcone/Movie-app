import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { notifyError } from '../components/Alert'
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

  const inputStyle = 'text-2xl bg-transparent text-gray-50 border-2 rounded-md border-sky-500 p-1 focus:outline-none'

  return (
    <form className='flex flex-col gap-5 items-center justify-center'>
      <p className='text-slate-50 text-4xl font-sans'>SIGN IN</p>
      <input onChange={(e) => setForm({
        ...form,
        username: e?.target?.value
      })} type="username" placeholder='Username' className={inputStyle} />
      <input onChange={(e) => setForm({
        ...form,
        password: e?.target?.value
      })} type="password" placeholder='Password' className={inputStyle} />
      <button onClick={(e) => {
        e?.preventDefault()
        void handleOnClick()
      }} className='text-2xl text-slate-50 hover:text-sky-500 transition'>
          Sign in
      </button>
      <Link to={{
        pathname: '/register'
      }}>
        <p className='text-2xl text-slate-50 hover:text-sky-500 transition'>
          New user?
        </p>
      </Link>
    </form>
  )
}

export default LoginPage
