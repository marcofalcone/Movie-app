import React, { useContext, useEffect, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { useParams } from 'react-router-dom'
import { Context } from '..'

import { Movie } from '../interfaces'
import { notifyError, notifySuccess, notifyWarning } from '../components/Alert'
import { loader } from '../utils/loader'

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
      <div className="bg-black bg-opacity-80 absolute w-screen h-screen flex flex-col justify-center items-center">
        <p onClick={() => setWatchTrailer(false)} className="text-2xl text-slate-50 cursor-pointer">CLOSE &#10006;</p>
        <iframe
          ref={ref}
          title="trailer"
          className="w-3/4 h-3/4 border border-sky-500"
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
    ? <>{loader}</>
    : (
      <>
        <div className="w-full h-full flex justify-center items-center">
          <img className="p-5 mr-5 border-r border-r-sky-500" src={imgUrl + poster} alt='' />
          <div className='text-2xl text-slate-50'>
            <p className='text-5xl'>{title}</p>
            <p>{date}</p>
            <p>{overview}</p>
            <span>{Number(vote).toFixed(1)}&#x2605;</span>
            <div className='mt-20'>
              {trailer !== undefined ? <p className="hover:text-sky-500 transition cursor-pointer" onClick={() => setWatchTrailer(true)}>Watch Trailer &#9658;</p> : null}
              {isMovieInFavorites
                ? (
                  <p className="hover:text-sky-500 transition cursor-pointer" onClick={() => { void removeFavorite() }}>Remove from favorites &#x2b;</p>
                )
                : (
                  <p className="hover:text-sky-500 transition cursor-pointer" onClick={() => { void addFavorite() }}>Add to favorites &#x2b;</p>
                )}
            </div>
          </div>
          {watchTrailer
            ? (
              <ModalTrailer />
            )
            : null}
        </div>
      </>
    )
}

export default DetailMovie
