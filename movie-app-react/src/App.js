import React from 'react';
import Homepage from './views/Homepage';
import SearchPage from './views/SearchPage';
import { Switch, Route, Link } from 'react-router-dom';
import Searchbox from './components/Searchbox';
import DetailMovie from './views/DetailMovie';
import DetailList from './views/DetailList';
import homeLogo from './assets/logo.svg';
import LoginPage from './views/LoginPage';

const App = () => {

  const isLogged = true;

  return (
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
        <LoginPage />
      )}
    </div>
  );
};

export default App;
