const Movielist = (props) => {
  function scroll_left() {
    document.getElementById('collection').scrollLeft += 1000;
  }

  function scroll_right() {
    document.getElementById('collection').scrollLeft += -1000;
  }

  const img_url = "https://image.tmdb.org/t/p/w500"

  return (
  <div className="container">
    <header>{props.title}</header>
    <div className="left" onClick={scroll_right}>&#10094;</div>
    <div className="right" onClick={scroll_left}>&#10095;</div>
    <div className="collection" id="collection">
    {props.movies.map((movie, index) =>
      <div className="movie">
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
)
}

export default Movielist
