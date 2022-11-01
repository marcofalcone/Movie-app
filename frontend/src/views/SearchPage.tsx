import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '..'
import MovieCard from '../components/MovieCard'

import '../styles/Search.css'

const SearchPage = (): JSX.Element => {
  const { apiKey } = useContext(Context)
  const [movies, setMovies] = useState([])

  const { search } = useLocation()
  const url = new URLSearchParams(search)
  const movieSearched = url.get('movie') ?? ''

  const getSearched = async (): Promise<void> => {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearched}&include_adult=false`
    const res = await (await fetch(urlSearch)).json()
    setMovies(res?.results)
  }

  useEffect(() => {
    void getSearched()
  }, [movieSearched])

  return (
    <div className='gridPage'>
      {movies?.length > 0
        ? movies?.map((movie, i) => (
          <MovieCard isSearch key={i} movie={movie} />
        ))
        : <h1 style={{ color: 'white', position: 'absolute' }}>No movies found</h1>}
    </div>
  )
}

export default SearchPage
