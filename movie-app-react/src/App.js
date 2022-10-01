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

const App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [isCheckingUser, setIsCheckingUser] = useState(false);

  const checkUser = async () => {
    setIsCheckingUser(true);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: localStorage.getItem('accessToken')
      })
    };
    const res = await fetch('/api/users/auth', requestOptions);
    const resJson = await res.json();
    if (resJson && resJson.code === 1) setIsLogged(true);
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
            <Searchbox />
          </div>
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route path="/search/:search">
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
        <LoginPage setIsLogged={setIsLogged} />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
