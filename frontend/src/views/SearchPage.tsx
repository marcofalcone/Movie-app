import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '..'
import MovieCard from '../components/MovieCard'

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
    <div className='grid grid-cols-9 gap-5'>
      {movies?.length > 0
        ? movies?.map((movie, i) => (
          <div key={i}><MovieCard isSearch movie={movie} /></div>
        ))
        : <h1 style={{ color: 'white', position: 'absolute' }}>No movies found</h1>}
    </div>
  )
}

export default SearchPage
