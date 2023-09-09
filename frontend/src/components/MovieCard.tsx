import React, { useContext } from 'react'
import { Link } from 'react-router-dom' // api address for poster img
import { Context } from '..'
import { Movie } from '../interfaces'

const MovieCard = ({ movie }: { movie: Movie, isSearch?: boolean }): JSX.Element => {
  const { imgUrl } = useContext(Context)

  return (
    <Link to={{
      pathname: `/${movie.id}`
    }}>
      <img className="h-72 rounded-xl border-2 border-transparent hover:border-sky-500 hover:scale-110 transition" src={imgUrl + movie.poster_path} alt='' />
    </Link>
  )
}

export default MovieCard
