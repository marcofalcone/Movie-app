import React, { useState, useEffect } from 'react';

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'

import './App.css';


const App = (props) => {
  const [movies, setMovies] = useState([])
  const [mylist, setMylist] = useState([])

  const [search, setSearch] = useState('')

  const getMovies = async () => {
    const url_default = "https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"; //default list of movies
    const url = `https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query=${search}`;

    const response_default = await fetch(url_default);
    const responseJson_default = await response_default.json();

    const response = await fetch(url);
    const responseJson = await response.json();

      if (responseJson.results) {       //show default list of movies unless something is typed in the searchbox
      setMovies(responseJson.results)
    } else {
      setMovies(responseJson_default.results)
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
    <div className="topbar">
      <h1 className="header">SINEMA</h1>
      <Searchbox search={search} setSearch={setSearch} />
    </div>
        <Movielist title={"Movies"} movies={movies} handlelist={addList} function={"ADD TO LIST"} />
        <Movielist title={"My list"} movies={mylist} handlelist={removeList} function={"REMOVE FROM LIST"} />
    </div>
  );
}

export default App;
