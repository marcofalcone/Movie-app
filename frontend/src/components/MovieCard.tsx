import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // api address for poster img
import { Context } from '..'
import { Movie } from '../interfaces'

const MovieCard = ({ movie, isSearch }: { movie: Movie, isSearch?: boolean }): JSX.Element => {
  const { imgUrl } = useContext(Context)

  return (
    <div className={isSearch ?? isSearch === true ? 'searchMovie' : 'movie'}>
      <Link to={{
        pathname: `/${movie.id}`
      }}>
        <img className="poster" src={imgUrl + movie.poster_path} alt='' />
      </Link>
    </div>
  )
}

export default MovieCard
