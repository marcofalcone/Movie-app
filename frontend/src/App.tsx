import React, { useEffect, useState } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import LoginPage from './views/LoginPage'
import { ToastContainer } from 'react-toastify'
import RegisterPage from './views/RegisterPage'
import homeLogo from './assets/logo.svg'
import Loader from './components/Loader'
import Searchbox from './components/Searchbox'
import Homepage from './views/Homepage'
import SearchPage from './views/SearchPage'
import DetailMovie from './views/DetailMovie'
import DetailList from './views/DetailList'

const App = (): JSX.Element => {
  const [isLogged, setIsLogged] = useState(false)
  const [isCheckingUser, setIsCheckingUser] = useState(false)

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
    else setIsLogged(false)
    setIsCheckingUser(false)
  }

  useEffect(() => {
    void checkUser()
  }, [])

  return isCheckingUser
    ? <Loader />
    : (
      <div className='mainWrapper'>
        {isLogged
          ? (
            <>
              <div className="topBar">
                <Link to="/">
                  <img className="logo" src={homeLogo} alt="" />
                </Link>
                <Searchbox checkUser={() => {
                  void checkUser()
                }} />
              </div>
              <Switch>
                <Route exact path="/">
                  <Homepage />
                </Route>
                <Route path="/search">
                  <SearchPage />
                </Route>
                <Route path="/detail-movie/:id">
                  <DetailMovie />
                </Route>
                <Route path="/detail-list/:id">
                  <DetailList />
                </Route>
              </Switch>
            </>
          )
          : (
            <Switch>
              <Route exact path="/">
                <LoginPage setIsLogged={setIsLogged} />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
            </Switch>
          )}
        <ToastContainer />
      </div>
    )
}

export default App
