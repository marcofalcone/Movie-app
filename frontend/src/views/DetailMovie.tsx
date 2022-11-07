import React, { useContext, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useParams } from 'react-router-dom'
import { Context } from '..'

import '../styles/Detail.css'
import { Movie } from '../interfaces'
import { notifyError, notifySuccess, notifyWarning } from '../components/Alert'
import Loader from '../components/Loader'

const DetailMovie = (): JSX.Element => {
  const { apiKey, imgUrl } = useContext(Context)
  const { id }: { id: string } = useParams() ?? {}

  const {
    user
  }: { user: string } = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : ''

  const [movie, setMovie] = useState({
    poster: '',
    overview: '',
    vote: '',
    date: '',
    title: '',
    trailer: ''
  })

  const [watchTrailer, setWatchTrailer] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [isFetchingDetails, setIsFetchingDetails] = useState(false)

  const {
    poster, overview, vote, date, title, trailer
  } = movie

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

  const getDetails = async (): Promise<void> => {
    setIsFetchingDetails(true)
    const urlDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
    const resDetails = await (await fetch(urlDetails)).json()
    const resVideos = await (await fetch(urlVideos)).json()
    if (resVideos?.results !== undefined && resDetails !== undefined) {
      const objTrailer = resVideos.results.find((obj: { type: string }) => obj.type === 'Trailer')
      if (objTrailer !== undefined) {
        setMovie({
          poster: resDetails?.poster_path,
          overview: resDetails?.overview,
          vote: resDetails?.vote_average,
          date: resDetails?.release_date,
          title: resDetails?.title,
          trailer: objTrailer?.key
        })
      }
    }
    setIsFetchingDetails(false)
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
    void getFavorites()
    void getDetails()
  }, [user])

  return isFetchingDetails
    ? <Loader />
    : (
      <>
        <div className='detailWrapper'>
          <div className="info">
            <img className="detailPoster" src={imgUrl + poster} alt='' />
            <div>
              <p style={{ fontSize: '30px', marginBottom: '100px' }}>{title}</p>
              <p style={{ fontSize: '30px' }}>{date}</p>
              <p>{overview}</p>
              <span style={{ fontSize: '30px' }}>{Number(vote).toFixed(1)}&#x2605;</span>
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
