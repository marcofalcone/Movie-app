import React, { useState, useEffect, useContext } from 'react';
import Homepage from './views/Homepage';
import SearchPage from './views/SearchPage';
import { Switch, Route, Link } from 'react-router-dom';
import Searchbox from './components/Searchbox';
import DetailMovie from './views/DetailMovie';
import DetailList from './views/DetailList';
import { Context } from './index';
import homeLogo from './assets/logo.svg';
import LoginPage from './views/LoginPage';

const App = () => {
  const { apiKey } = useContext(Context);
  const [isFetching, setIsFetching] = useState(true);

  const [movies, setMovies] = useState({
    popular: [],
    searched: [],
    genres: {
      action : [],
      comedy : [],
      horror : [],
      romance : [],
      scifi : [],
      thriller : [],
    }
  });

  const getMovies = async () => {

    const urlAction = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlComedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlHorror = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlRomance = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlScifi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;

    const response_Action = await fetch(urlAction);
    const responseJson_Action = await response_Action.json();

    const response_Comedy = await fetch(urlComedy);
    const responseJson_Comedy = await response_Comedy.json();

    const response_Horror = await fetch(urlHorror);
    const responseJson_Horror = await response_Horror.json();

    const response_Romance = await fetch(urlRomance);
    const responseJson_Romance = await response_Romance.json();

    const response_Scifi = await fetch(urlScifi);
    const responseJson_Scifi = await response_Scifi.json();

    const response_Thriller = await fetch(urlThriller);
    const responseJson_Thriller = await response_Thriller.json();

    const urlMostPopular = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    const response_MostPopular = await fetch(urlMostPopular);
    const responseJson_MostPopular = await response_MostPopular.json();

    if (responseJson_Action
      && responseJson_Comedy
      && responseJson_Horror
      && responseJson_Romance
      && responseJson_Scifi
      && responseJson_Thriller
      && responseJson_MostPopular?.results) {
      setMovies({
        ...movies,
        popular: responseJson_MostPopular.results,
        genres: {
          action : responseJson_Action?.results,
          comedy : responseJson_Comedy?.results,
          horror : responseJson_Horror?.results,
          romance : responseJson_Romance?.results,
          scifi : responseJson_Scifi?.results,
          thriller : responseJson_Thriller?.results,
        }
      });
    }

    setIsFetching(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

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
              <Homepage movies={movies} isFetching={isFetching} />
            </Route>
            <Route path="/search/:search">
              <SearchPage movies={movies.searched} />
            </Route>
            <Route path="/detailMovie/:id">
              <DetailMovie />
            </Route>
            <Route path="/detailList/:id">
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
