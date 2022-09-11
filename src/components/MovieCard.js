import React from "react";
import { Link } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/w500" // api address for poster img

const MovieCard = ({movie, isSearch}) => (
  <div className={isSearch ? "searchMovie" : "movie"}>
      <Link to="/detail">
        <img className="poster" src={img_url + movie.poster_path} alt='' />
        {/* <div className="over">
          <p>{movie.overview}</p>
          <p>&#9734;{movie.vote_average}</p>
          <p onClick={() => props.handlelist(movie)}>{props.function}</p>
        </div> */}
      </Link>
  </div>
)

export default MovieCard
