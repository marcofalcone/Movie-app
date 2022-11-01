import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // api address for poster img
import { Context } from '..'
import { Movie } from '../interfaces'

const MovieCard = ({ movie, isSearch }: { movie: Movie, isSearch?: boolean }): JSX.Element => {
  const { imgUrl } = useContext(Context)

  return (
    <div className={isSearch ?? isSearch === true ? 'searchMovie' : 'movie'}>
      <Link to={{
        pathname: `/detail-movie/${movie.title}`,
        state: {
          poster: imgUrl + movie.poster_path,
          overview: movie.overview,
          vote: movie.vote_average,
          date: movie.release_date,
          title: movie.title,
          id: `${movie.id}`
        }
      }}>
        <img className="poster" src={imgUrl + movie.poster_path} alt='' />
      </Link>
    </div>
  )
}

export default MovieCard
