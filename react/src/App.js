import React, { useEffect, useState } from 'react';
import Homepage from './views/Homepage';
import SearchPage from './views/SearchPage';
import { Switch, Route, Link } from 'react-router-dom';
import Searchbox from './components/Searchbox';
import DetailMovie from './views/DetailMovie';
import DetailList from './views/DetailList';
import homeLogo from './assets/logo.svg';
import LoginPage from './views/LoginPage';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader';
import RegisterPage from './views/RegisterPage';

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  const checkUser = async () => {
    setIsCheckingUser(true);
    const {
      accessToken,
      email
    } = JSON.parse(localStorage.getItem('user')) ?? {};

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken,
        email,
      })
    };
    const res = await fetch('/api/users/auth', requestOptions);
    const resJson = await res.json();
    if (resJson && resJson.code === 1) setIsLogged(true);
    else setIsLogged(false);
    setIsCheckingUser(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return isCheckingUser ? <Loader /> : (
    <div className='mainWrapper'>
      {isLogged ? (
        <>
          <div className="topBar">
            <Link to="/">
              <img className="logo" src={homeLogo} alt="" />
            </Link>
            <Searchbox checkUser={checkUser} />
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
      ) : (
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
  );
};

export default App;
