import React from 'react';
import MovieCard from './MovieCard';
import Loader from './Loader';

import '../styles/Movielist.css';
import '../styles/ResponsiveMovielist.css';
import { Link } from 'react-router-dom';

const Movielist = (props) => {

  const {
    id,
    title,
    movies,
    isFetching,
  } = props;

  const scroll_left = () => {
    document.getElementById(id).scrollLeft += 1500; // see readme.md
  };

  const scroll_right = () => {
    document.getElementById(id).scrollLeft += -1500; // REDO
  };
  

  return (
    <div className="container">
      <Link to={{
        pathname: `/detail-list/${title}`,
        state: {
          movies: movies,
          title: title
        }
      }}>
        <span className="collectionTitle">{title}</span>
      </Link>
      <div className="left" onClick={scroll_right}>&#10094;</div>
      <div className="right" onClick={scroll_left}>&#10095;</div>
      <div className="collection" id={id}>
        {isFetching && <>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
          <div className="movie">
            <Loader />
          </div>
        </>
        }
        {!isFetching && movies?.length ?
          movies.map((movie, i) =>
            movie?.poster_path ? (
              <MovieCard key={i} movie={movie} />
            ) : null) : []}
      </div>
    </div>
  );
};

export default Movielist;
