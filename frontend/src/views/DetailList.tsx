import { useHistory } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import { HistoryState, MovieObj } from '../interfaces'
import React from 'react'

import '../styles/Detail.css'

const DetailList = (): JSX.Element => {
  const history = useHistory()
  const { movies, title }: HistoryState | any = history.location.state

  return (
    <>
      <h1 style={{ color: 'white', marginLeft: '30px' }}>{title}</h1>
      <div className='gridPage'>
        {movies.map((movie: MovieObj, i: number) => (
          <MovieCard isSearch key={i} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default DetailList
