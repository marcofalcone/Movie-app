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

  const arrowRight = (
    <div onClick={scrollLeft} className='select-none cursor-pointer flex justify-center items-center opacity-0 transition ease-linear hover:opacity-100 hover:bg-black h-full w-12 absolute right-0 z-50 text-slate-50 text-5xl'>
      &#x2771;
    </div>
  )

  const arrowLeft = (
    <div onClick={scrollRight} className='select-none cursor-pointer flex justify-center items-center opacity-0 transition ease-linear hover:opacity-100 hover:bg-black h-full w-12 absolute z-50 text-slate-50 text-5xl'>
      &#x2770;
    </div>
  )

  return (
    <div className='relative mt-20'>
      <span className="absolute -top-10 text-2xl text-slate-50 select-none pl-5">{title}</span>
      <div className='overflow-x-hidden scroll-smooth' id={id}>
        <div className='flex w-max'>
          {arrowLeft}
          {arrowRight}
          {isFetching
            ? (
              <>
                {loader}
              </>
            )
            : movies?.map((movie, i) => <div className='ml-5' key={i}><MovieCard movie={movie} /></div>)}
        </div>
      </div>
    </div>
  )
}

export default Movielist
