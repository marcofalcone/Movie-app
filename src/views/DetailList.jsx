import React from 'react';
import { useHistory } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import '../styles/Detail.css'

const DetailList = () => {

  const history = useHistory();
  const { movies, title } = history.location.state;

  return (
    <>
      <h1 style={{ color: "white", marginLeft: "30px" }}>{title}</h1>
      <div className='gridPage'>
        {movies?.length ? movies?.map((movie, i) => (
        <MovieCard isSearch key={i} movie={movie} />
        )) : null}
      </div>
    </>
  )
}

export default DetailList;
