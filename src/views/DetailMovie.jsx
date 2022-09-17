/* eslint-disable react/no-unknown-property */
import React, { useContext, useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useHistory } from 'react-router-dom';
import { Context } from '..';

import '../styles/Detail.css';

const DetailMovie = () => {
  const { apiKey } = useContext(Context);
  const history = useHistory();
  
  const {
    poster, overview, vote, date, title, id
  } = history.location.state;
  
  const [trailer, setTrailer] = useState('');
  const [watchTrailer, setWatchTrailer] = useState(false);
  
  const getTrailer = async () => {
    const urlVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`;
    const response = await fetch(urlVideos);
    const responseJson = await response.json();
    if (responseJson?.results) {
      const objTrailer = responseJson?.results?.find((obj) => obj.type === 'Trailer');
      if (objTrailer) setTrailer(objTrailer?.key);
    }
  };

  useEffect(() => {
    getTrailer();
  }, [id]);

  const ModalTrailer = () => {
    const ref = useDetectClickOutside({ onTriggered: () => setWatchTrailer(false) });

    return (
      <div className="trailerWrapper">
        <p onClick={() => setWatchTrailer(false)} className="closeTrailer">CLOSE &#10006;</p>
        <iframe
          ref={ref}
          title="trailer"
          className="trailerFrame"
          src={`https://www.youtube.com/embed/${trailer}`}
          type="video/mp4"
          controls
          allowFullScreen="allowfullscreen"
          mozallowfullscreen="mozallowfullscreen"
          msallowfullscreen="msallowfullscreen"
          oallowfullscreen="oallowfullscreen"
          webkitallowfullscreen="webkitallowfullscreen" />
      </div>
    );
  };

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
            {trailer ? <p onClick={() => setWatchTrailer(true)} className='detailAction'>Watch Trailer &#9658;</p> : null}
            <p className='detailAction'>Add to favorites &#x2b;</p>
          </div>
        </div>
      </div>
      {watchTrailer ? (
        <ModalTrailer />
      ) : null}
    </>
  );
};

export default DetailMovie;
