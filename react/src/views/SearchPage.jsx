import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '..';
import MovieCard from '../components/MovieCard';

import '../styles/Search.css';

const SearchPage = () => {
  const { apiKey } = useContext(Context);
  const [movies, setMovies] = useState([]);

  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const movieSearched = url.get('movie');

  const getSearched = async () => {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearched}&include_adult=false`;
    const response_Search = await fetch(urlSearch);
    const responseJson_Search = await response_Search.json();
    if (responseJson_Search?.results) setMovies(responseJson_Search.results);
  };

  useEffect(() => {
    getSearched();
  }, [movieSearched]);

  return (
    <div className='gridPage'>
      {movies?.length ? movies?.map((movie, i) => (
        <MovieCard isSearch key={i} movie={movie} />
      )) : <h1 style={{ color: 'white', position: 'absolute' }}>No movies found</h1>}
    </div>
  );
};

export default SearchPage;
