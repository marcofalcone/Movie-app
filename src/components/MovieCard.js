import React from "react";
import { Link } from "react-router-dom";

const img_url = "https://image.tmdb.org/t/p/w500" // api address for poster img

const MovieCard = ({movie, isSearch}) => (
  <div className={isSearch ? "searchMovie" : "movie"}>
      <Link to={{
        pathname: "/detailMovie",
        state: {
          poster: img_url + movie.poster_path,
          overview: movie.overview,
          vote: movie.vote_average,
          date: movie.release_date
        }
      }}>
        <img className="poster" src={img_url + movie.poster_path} alt='' />
      </Link>
  </div>
)

export default MovieCard
