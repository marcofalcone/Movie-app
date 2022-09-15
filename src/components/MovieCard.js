import React, { useContext } from "react";
import { Link } from "react-router-dom"; // api address for poster img
import { Context } from "..";

const MovieCard = ({movie, isSearch}) => {

  const { imgUrl } = useContext(Context)

  return (
    <div className={isSearch ? "searchMovie" : "movie"}>
        <Link to={{
          pathname: `/detailMovie/${movie.title}`,
          state: {
            poster: imgUrl + movie.poster_path,
            overview: movie.overview,
            vote: movie.vote_average,
            date: movie.release_date,
            title: movie.title
          }
        }}>
          <img className="poster" src={imgUrl + movie.poster_path} alt='' />
        </Link>
    </div>
  )
}

export default MovieCard
