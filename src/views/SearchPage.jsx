import React from 'react';
import MovieCard from '../components/MovieCard';

import '../styles/Search.css'

const SearchPage = ({movies}) => (
  <div className='gridPage'>
    {movies?.length ? movies?.map((movie, i) => (
      <MovieCard isSearch key={i} movie={movie} />
    )) : <h1 style={{ color: "white", position: "absolute" }}>No movies found</h1>}
  </div>
)

export default SearchPage
