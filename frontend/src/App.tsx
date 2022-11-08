import React, { useEffect, useState } from 'react'
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './views/RegisterPage'
import homeLogo from './assets/logo.svg'
import Searchbox from './components/Searchbox'
import Homepage from './views/Homepage'
import SearchPage from './views/SearchPage'
import DetailMovie from './views/DetailMovie'
import LoginPage from './views/LoginPage'

import './index.css'

const App = (): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(false)
  const history = useHistory()

  const {
    user,
    accessToken
  } = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : ''

  const checkUser = async (): Promise<void> => {
    setIsCheckingUser(true)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken,
        username: user
      })
    }
    const res = await (await fetch('/api/users/auth', requestOptions)).json()

    if (res?.code === 1) setIsLogged(true)
    else {
      setIsLogged(false)
      history.push('/')
    }
    setIsCheckingUser(false)
  }

  useEffect(() => {
    void checkUser()
  }, [])

  return isCheckingUser
    ? <>LOADER</>
    : (
      <>
        {isLogged
          ? (
            <>
              <div className="flex justify-between p-5 items-center">
                <Link to="/">
                  <img className="h-5" src={homeLogo} alt="" />
                </Link>
                <Searchbox setIsLogged={setIsLogged} />
              </div>
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route path="/search">
                  <SearchPage />
                </Route>
                <Route path="/:id">
                  <DetailMovie />
                </Route>
              </Switch>
            </>
          )
          : (
            <div className='w-screen h-screen flex justify-center items-center flex-col'>
              <img className='h-7 absolute top-10' src={homeLogo} alt="" />
              <Switch>
                <Route exact path="/">
                  <LoginPage setIsLogged={setIsLogged} />
                </Route>
                <Route path="/register">
                  <RegisterPage />
                </Route>
              </Switch>
            </div>
          )}
        <ToastContainer />
      </>
    )
}

export default App
