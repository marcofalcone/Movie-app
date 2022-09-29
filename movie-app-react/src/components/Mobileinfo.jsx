import React from 'react';
import '../styles/Mobileinfo.css';

const Mobileinfo = (props) => {
  const img_url = 'https://image.tmdb.org/t/p/w500'; // api address for poster img
  return props.movie.map( (movie, i) =>
    <div key={i} className="moviemobile">
      <p className="close" onClick={props.close}>&#10005;</p>
      <div className="insidecont">
        <div className="info">
          <p><img className="postermobile" src={img_url + movie.poster_path} alt='' />{movie.overview}</p>
          <p>&#9734;{movie.vote_average}</p>
        </div>
      </div>
      <p className="button" onClick={() => props.handlelist(movie)}>{props.function}</p>
    </div>);
};

export default Mobileinfo;
