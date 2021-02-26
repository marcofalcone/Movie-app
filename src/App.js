import React, { useState, useEffect } from 'react';

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'

import './App.css';


const App = (props) => {

  const [action, setAction] = useState([])
  const [comedy, setComedy] = useState([])
  const [horror, setHorror] = useState([])
  const [romance, setRomance] = useState([])
  const [scifi, setScifi] = useState([])
  const [thriller, setThriller] = useState([])

  const [movies, setMovies] = useState([])
  const [mylist, setMylist] = useState([])

  const [search, setSearch] = useState('')


  const getMovies = async () => {
    const urlMostPopular = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    const urlAction = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlComedy = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlHorror = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlRomance = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlScifi = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlThriller = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=77de0ebb8c18224df76cf38477a907f5&query=${search}`;

    const response_MostPopular = await fetch(urlMostPopular);
    const responseJson_MostPopular = await response_MostPopular.json();

    const response_Action = await fetch(urlAction);
    const responseJson_Action = await response_Action.json();

    const response_Comedy = await fetch(urlComedy);
    const responseJson_Comedy = await response_Comedy.json();

    const response_Horror = await fetch(urlHorror);
    const responseJson_Horror = await response_Horror.json();

    const response_Romance = await fetch(urlRomance);
    const responseJson_Romance = await response_Romance.json();

    const response_Scifi = await fetch(urlScifi);
    const responseJson_Scifi = await response_Scifi.json();

    const response_Thriller = await fetch(urlThriller);
    const responseJson_Thriller = await response_Thriller.json();

    const response_Search = await fetch(urlSearch);
    const responseJson_Search = await response_Search.json();

    setAction(responseJson_Action.results)
    setComedy(responseJson_Comedy.results)
    setHorror(responseJson_Horror.results)
    setRomance(responseJson_Romance.results)
    setScifi(responseJson_Scifi.results)
    setThriller(responseJson_Thriller.results)

      if (responseJson_Search.results) {
      setMovies(responseJson_Search.results)
    } else {
      setMovies(responseJson_MostPopular.results)
    }
  }

  useEffect(() => {
    getMovies();
  }, [search]);    //run getMovies function when search value changes

  const addList = (movie) => {
    const newList = [...mylist, movie];
    setMylist(newList);
  }

  const removeList = (movie) => {
    const newList = mylist.filter(
      (item) => item.id !== movie.id
    );
    setMylist(newList);
  }

  return (
    <div className="overlay">
    <div className="top">
      <img className="header" src="logo.svg" alt="" />
      <Searchbox search={search} setSearch={setSearch} />
    </div>
        <Movielist movies={movies} handlelist={addList} function={"ADD TO LIST"} id={"search"} />
        <Movielist title={"Action"} movies={action} handlelist={addList} function={"ADD TO LIST"} id={"action"} />
        <Movielist title={"Comedy"} movies={comedy} handlelist={addList} function={"ADD TO LIST"} id={"comedy"} />
        <Movielist title={"Horror"} movies={horror} handlelist={addList} function={"ADD TO LIST"} id={"horror"} />
        <Movielist title={"Romance"} movies={romance} handlelist={addList} function={"ADD TO LIST"} id={"romance"} />
        <Movielist title={"Sci-fi"} movies={scifi} handlelist={addList} function={"ADD TO LIST"} id={"scifi"} />
        <Movielist title={"Thriller"} movies={thriller} handlelist={addList} function={"ADD TO LIST"} id={"thriller"} />
        <Movielist title={"My list"} movies={mylist} handlelist={removeList} function={"REMOVE FROM LIST"} id={"mylist"} />
    </div>
  );
}

export default App;
