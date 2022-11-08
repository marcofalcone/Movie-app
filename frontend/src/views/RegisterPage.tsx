import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
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
    <form className='flex flex-col gap-5 items-center'>
      <p className='text-slate-50 text-4xl font-sans'>REGISTER</p>
      <input onChange={(e) => setForm({
        ...form,
        username: e?.target?.value
      })} type="username" placeholder='Username' className='text-2xl bg-transparent text-gray-50 border-2 rounded-md border-sky-500 p-1' />
      <input onChange={(e) => setForm({
        ...form,
        password: e?.target?.value
      })} type="password" placeholder='Password' className='text-2xl bg-transparent text-gray-50 border-2 rounded-md border-sky-500 p-1' />
      <button onClick={(e) => {
        e?.preventDefault()
        void handleOnClick()
      }} className='text-2xl text-slate-50 hover:text-sky-500 transition'>
          Register
      </button>
    </form>
  )
}

export default RegisterPage
