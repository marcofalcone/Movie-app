import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Context } from '..'
import MovieCard from '../components/MovieCard'
import { Movie } from '../interfaces'

const SearchPage = (): JSX.Element => {
  const { apiKey } = useContext(Context)
  const [movies, setMovies] = useState([])

  const { search } = useLocation()
  const url = new URLSearchParams(search)
  const movieSearched = url.get('movie') ?? ''

  const getSearched = async (): Promise<void> => {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieSearched}&include_adult=false`
    const res = await (await fetch(urlSearch)).json()
    const filteredMovie = Array.isArray(res?.results) ? res.results.filter((movie: Movie) => movie.poster_path) : []
    setMovies(filteredMovie)
  }

  useEffect(() => {
    void getSearched()
  }, [movieSearched])

  return (
    <div className='grid lg:grid-cols-9 md:grid-cols-5 sm:grid-cols-3  gap-5'>
      {movies?.length > 0
        ? movies?.map((movie, i) => (
          <div key={i}><MovieCard isSearch movie={movie} /></div>
        ))
        : <h1 style={{ color: 'white', position: 'absolute' }}>No movies found</h1>}
    </div>
  )
}

export default SearchPage
