import MovieCard from './MovieCard'
import React from 'react'

import '../styles/Movielist.css'
import { Props } from '../interfaces'
import Loader from './Loader'

const Movielist = (props: Props): JSX.Element => {
  const {
    id,
    title,
    movies,
    isFetching
  } = props

  const movieListElement = document.getElementById(id)

  // eslint-disable-next-line no-return-assign
  const scrollLeft = (): number | null => movieListElement != null ? movieListElement.scrollLeft += 1500 : null

  // eslint-disable-next-line no-return-assign
  const scrollRight = (): number | null => (movieListElement != null) ? movieListElement.scrollLeft += -1500 : null

  return (
    <div className="container">
      <span className="collectionTitle">{title}</span>
      <div className="left" onClick={scrollRight}>&#10094;</div>
      <div className="right" onClick={scrollLeft}>&#10095;</div>
      <div className="collection" id={id}>
        {isFetching
          ? (
            <>
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
              <Loader />
            </>
          )
          : movies?.map((movie, i) => <MovieCard key={i} movie={movie} />)}
      </div>
    </div>
  )
}

export default Movielist
