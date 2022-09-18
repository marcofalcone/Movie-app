import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '..';
import MovieCard from '../components/MovieCard';

import '../styles/Search.css';

const SearchPage = () => {
  const { apiKey } = useContext(Context);
  const { search } = useParams();
  const [movies, setMovies] = useState([]);

  const getSearched = async () => {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;
    const response_Search = await fetch(urlSearch);
    const responseJson_Search = await response_Search.json();
    if (responseJson_Search?.results) setMovies(responseJson_Search.results);
  };

  useEffect(() => {
    getSearched();
  }, [search]);

  return (
    <div className='gridPage'>
      {movies?.length ? movies?.map((movie, i) => (
        <MovieCard isSearch key={i} movie={movie} />
      )) : <h1 style={{ color: 'white', position: 'absolute' }}>No movies found</h1>}
    </div>
  );
};

export default SearchPage;
