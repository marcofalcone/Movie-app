import '../styles/ResponsiveMovielist.css'

const ResponsiveMovielist = (props) => {
  const img_url = "https://image.tmdb.org/t/p/w500" // api address for poster img

  return (
  <div className="containerDevice">
    <header className="headerDevice">{props.title}</header>
    <div className="collectionDevice" id={props.id}>
    {props.movies.map( (movie, i) =>
      <div key={i} className="movieDevice" onClick={() => props.toggle(movie)}>
          <img className="posterDevice" src={img_url + movie.poster_path} alt='' />
      </div>
    )}
    </div>
  </div>
)
}

export default ResponsiveMovielist
