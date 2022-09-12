import React from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/Detail.css'

const DetailMovie = () => {

  const history = useHistory();
  const {
    poster, overview, vote, date
  } = history.location.state;

  return (
    <div className='detailWrapper'>
      <div className="info">
        <img className="detailPoster" src={poster} alt='' />
        <div>
        <span style={{ fontSize: "30px" }}>{date}</span>
          <p>{overview}</p>
          <span style={{ fontSize: "30px" }}>{vote} &#9734;</span>
          <div style={{ fontSize: "30px", marginTop: "100px", cursor: "pointer" }}>
            <p>Add to favorites</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailMovie;
