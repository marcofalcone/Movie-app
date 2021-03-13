import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive'

import Loader from './Loader'

import '../styles/Movielist.css'
import '../styles/ResponsiveMovielist.css'

const Movielist = (props) => {
  const scroll_left = () => {
    document.getElementById(props.id).scrollLeft += 1500; // see readme.md
  }

  const scroll_right = () => {
    document.getElementById(props.id).scrollLeft += -1500;
  }

  const img_url = "https://image.tmdb.org/t/p/w500" // api address for poster img

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1225px)'
  })

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })

  return(
    <>
      {isDesktopOrLaptop &&
        <div className="container">
          <header>{props.title}</header>
            <div className="left" onClick={scroll_right}>&#10094;</div>
            <div className="right" onClick={scroll_left}>&#10095;</div>
              <div className="collection" id={props.id}>
              {props.loading && <>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                  <div className="movie">
                    <Loader />
                  </div>
                </>
              }
                {!props.loading &&
                props.movies.map( (movie, i) =>
                  <div key={i} className="movie">
                      <img className="poster" src={img_url + movie.poster_path} alt='' />
                      <div className="over">
                        <p>{movie.overview}</p>
                        <p>&#9734;{movie.vote_average}</p>
                        <p onClick={() => props.handlelist(movie)}>{props.function}</p>
                      </div>
                  </div>
                )}
              </div>
        </div>
          }
      {isTabletOrMobileDevice &&
        <div className="containerDevice">
          <header className="headerDevice">{props.title}</header>
            <div className="collectionDevice">
            {props.loading && <>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
                <div className="movieDevice">
                  <Loader />
                </div>
              </>
            }
            {!props.loading &&
              props.movies.map( (movie, i) =>
              <div key={i} className="movieDevice" onClick={() => props.toggle(movie)}>
                  <img className="posterDevice" src={img_url + movie.poster_path} alt='' />
              </div>
            )}
            </div>
        </div>
      }
    </>
  )
}

export default Movielist
