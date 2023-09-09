import React from 'react'
import MovieCard from './MovieCard'

import { Props } from '../interfaces'
import { loader } from '../utils/loader'

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

  const arrowStyle = 'bg-gradient-to-b from-transparent via-black via-50% to-transparent select-none cursor-pointer flex justify-center items-center opacity-80 transition ease-linear hover:bg-black hover:opacity-100 h-72 w-12 absolute z-40 text-slate-50 text-5xl'

  const arrowRight = (
    <div onClick={scrollLeft} className={`${arrowStyle} right-0`}>
      &#x2771;
    </div>
  )

  const arrowLeft = (
    <div onClick={scrollRight} className={arrowStyle}>
      &#x2770;
    </div>
  )

  const filteredMovieList = Array.isArray(movies) ? movies.filter((movie) => movie.poster_path) : []

  return (
    <div className='relative mt-10'>
      <span className="absolute -top-7 text-2xl text-slate-50 select-none pl-5">{title}</span>
      <div className='overflow-x-hidden scroll-smooth py-5' id={id}>
        <div className='flex w-max'>
          {arrowLeft}
          {arrowRight}
          {isFetching
            ? (
              <>
                {loader}
              </>
            )
            : filteredMovieList.map((movie, i) => <div className='ml-5' key={i}><MovieCard movie={movie} /></div>)}
        </div>
      </div>
    </div>
  )
}

export default Movielist
