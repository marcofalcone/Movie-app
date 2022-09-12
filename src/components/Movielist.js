import React from 'react';
import MovieCard from './MovieCard';
import Loader from './Loader'

import '../styles/Movielist.css'
import '../styles/ResponsiveMovielist.css'
import { Link } from 'react-router-dom';

const Movielist = (props) => {
  const scroll_left = () => {
    document.getElementById(props.id).scrollLeft += 1500; // see readme.md
  }

  const scroll_right = () => {
    document.getElementById(props.id).scrollLeft += -1500; // REDO
  }

  return (
    <div className="container">
      <Link to={{
        pathname: "/detailList",
        state: {
          movies: props.movies,
          title: props.title
        }
      }}>
        <span className="collectionTitle">{props.title}</span>
      </Link>
      <div className="left" onClick={scroll_right}>&#10094;</div>
      <div className="right" onClick={scroll_left}>&#10095;</div>
        <div className="collection" id={props.id}>
        {props.isFetching && <>
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
          {!props.isFetching &&
          props.movies.map((movie, i) => // SHOW MOVIE ONLY IF THERE IS AN IMAGE
            movie?.poster_path ? (
              <MovieCard key={i} movie={movie} />
            ) : null
          )}
      </div>
      </div>
  )
}

export default Movielist
