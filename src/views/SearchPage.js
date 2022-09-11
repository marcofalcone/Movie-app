import React from 'react';
import MovieCard from '../components/MovieCard';

import '../styles/Search.css'

const SearchPage = ({movies}) => (
  <div className='searchPage'>
    {movies?.map((movie, i) => (
      <MovieCard isSearch key={i} movie={movie} />
    ))}
  </div>
)

export default SearchPage
