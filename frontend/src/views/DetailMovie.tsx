import React, { useContext, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useHistory } from 'react-router-dom'
import { Context } from '..'

import '../styles/Detail.css'
import { Movie, MovieObj } from '../interfaces'
import { notifyError, notifySuccess, notifyWarning } from '../components/Alert'

const DetailMovie = (): JSX.Element => {
  const { apiKey } = useContext(Context)
  const history = useHistory()

  const {
    user
  }: { user: string } = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : ''

  const {
    poster, overview, vote, date, title, id
  } = history.location.state as MovieObj

  const [trailer, setTrailer] = useState('')
  const [watchTrailer, setWatchTrailer] = useState(false)
  const [favorites, setFavorites] = useState([])

  const isMovieInFavorites = favorites.some((movie: Movie) => movie?.id === id)

  const getFavorites = async (): Promise<void> => {
    const res = await (await fetch(`/api/movies/favorites/${user}`)).json()

    if (res?.code === 1) setFavorites(res?.list)
  }

  const addFavorite = async (): Promise<void> => {
    if (isMovieInFavorites) {
      notifyWarning('Movie is already in your list')
      return
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        poster_path: poster,
        overview,
        vote_average: vote,
        release_date: date,
        title,
        id
      })
    }
    const res = await fetch(`/api/movies/favorites/${user}`, requestOptions)
    if (res.status === 200) {
      notifySuccess('Movie successfully added')
      void getFavorites()
    } else notifyError()
  }

  const removeFavorite = async (): Promise<void> => {
    const requestOptions = {
      method: 'DELETE'
    }
    const res = await fetch(`/api/movies/favorites/${user}/${id}`, requestOptions)
    if (res.status === 200) {
      notifySuccess('Movie successfully removed')
      void getFavorites()
    } else notifyError()
  }

  const getTrailer = async (): Promise<void> => {
    const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    const response = await (await fetch(urlVideos)).json()
    if (response?.results !== undefined) {
      const objTrailer = response.results.find((obj: { type: string }) => obj.type === 'Trailer')
      if (objTrailer !== undefined) setTrailer(objTrailer?.key)
    }
  }

  const ModalTrailer = (): JSX.Element => {
    const ref = useDetectClickOutside({ onTriggered: () => setWatchTrailer(false) })

    return (
      <div className="trailerWrapper">
        <p onClick={() => setWatchTrailer(false)} className="closeTrailer">CLOSE &#10006;</p>
        <iframe
          ref={ref}
          title="trailer"
          className="trailerFrame"
          src={`https://www.youtube.com/embed/${trailer}`}
          allowFullScreen
        />
      </div>
    )
  }

  useEffect(() => {
    void getTrailer()
    void getFavorites()
  }, [user])

  return (
    <>
      <div className='detailWrapper'>
        <div className="info">
          <img className="detailPoster" src={poster} alt='' />
          <div>
            <p style={{ fontSize: '30px', marginBottom: '100px' }}>{title}</p>
            <p style={{ fontSize: '30px' }}>{date}</p>
            <p>{overview}</p>
            <span style={{ fontSize: '30px' }}>{vote}&#x2605;</span>
            {trailer !== undefined ? <p onClick={() => setWatchTrailer(true)} className='detailAction'>Watch Trailer &#9658;</p> : null}
            {isMovieInFavorites
              ? (
                <p onClick={() => { void removeFavorite() }} className='detailAction'>Remove from favorites &#x2b;</p>
              )
              : (
                <p onClick={() => { void addFavorite() }} className='detailAction'>Add to favorites &#x2b;</p>
              )}
          </div>
        </div>
      </div>
      {watchTrailer
        ? (
          <ModalTrailer />
        )
        : null}
    </>
  )
}

export default DetailMovie
