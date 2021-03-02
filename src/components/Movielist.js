import '../styles/Movielist.css'

const Movielist = (props) => {
  const scroll_left = () => {
    document.getElementById(props.id).scrollLeft += 1500;
  }

  const scroll_right = () => {
    document.getElementById(props.id).scrollLeft += -1500;
  }

  const img_url = "https://image.tmdb.org/t/p/w500" // api address for poster img

  return (
  <div className="container">
    <header>{props.title}</header>
    <div className="left" onClick={scroll_right}>&#10094;</div>
    <div className="right" onClick={scroll_left}>&#10095;</div>
    <div className="collection" id={props.id}>
    {props.movies.map( (movie, i) =>
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
)
}

export default Movielist
