import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import Movielist from '../components/Movielist'

import '../styles/App.css'

const Homepage = (): JSX.Element => {
  const { apiKey } = useContext(Context)
  const [isFetching, setIsFetching] = useState(true)

  const {
    user
  }: { user: string } = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : ''

  const [movies, setMovies] = useState({
    popular: [],
    favorites: [],
    genres: {
      action: [],
      comedy: [],
      horror: [],
      romance: [],
      scifi: [],
      thriller: []
    }
  })

  const urlAction = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlComedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlHorror = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlRomance = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlScifi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`
  const urlMostPopular = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`

  const listGenres = [urlAction, urlComedy, urlHorror, urlRomance, urlScifi, urlThriller]

  const getMovies = async (arr: string[]): Promise<void> => {
    const moviesFetch = arr.map(async (url: string) => await (await fetch(url)).json())
    const [
      { results: actionMovies },
      { results: comedyMovies },
      { results: horrorMovies },
      { results: romanceMovies },
      { results: sciFiMovies },
      { results: thrilleMovies }
    ] = await Promise.all(moviesFetch)

    const { results: mostPopularMovies } = await (await fetch(urlMostPopular)).json()

    const { list: favoriteMovies } = await (await fetch(`/api/movies/favorites/${user}`)).json()

    setIsFetching(false)
    setMovies({
      ...movies,
      popular: mostPopularMovies,
      favorites: favoriteMovies,
      genres: {
        action: actionMovies,
        comedy: comedyMovies,
        horror: horrorMovies,
        romance: romanceMovies,
        scifi: sciFiMovies,
        thriller: thrilleMovies
      }
    })
  }

  const {
    popular,
    genres,
    favorites
  } = movies

  const {
    action,
    comedy,
    horror,
    romance,
    scifi,
    thriller
  } = genres

  const genresList = [
    {
      title: 'Trending now',
      items: popular,
      id: 'popular'
    },
    {
      title: 'Action',
      items: action,
      id: 'action'
    },
    {
      title: 'Comedy',
      items: comedy,
      id: 'comedy'
    },
    {
      title: 'Horror',
      items: horror,
      id: 'horroe'
    },
    {
      title: 'Romance',
      items: romance,
      id: 'romance'
    },
    {
      title: 'Sci-fi',
      items: scifi,
      id: 'scifi'
    },
    {
      title: 'Thriller',
      items: thriller,
      id: 'thriller'
    },
    {
      title: 'My list',
      items: favorites,
      id: 'myList'
    }
  ]

  useEffect(() => {
    void getMovies(listGenres)
  }, [user])

  return (
    <>
      {genresList.map((genre) => (
        <Movielist
          key={genre.id}
          isFetching={isFetching}
          title={genre.title}
          movies={genre.items}
          id={genre.id}
        />
      ))}
    </>
  )
}

export default Homepage