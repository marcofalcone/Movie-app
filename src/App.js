import React, { useState, useEffect } from 'react';

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'

import './App.css';


const App = (props) => {
  const [movies, setMovies] = useState([])
  const [mylist, setList] = useState([])

  const [search, setSearch] = useState('')

  const getMovie = async (setSearch) => {
    const url_default = "https://api.themoviedb.org/3/discover/movie?api_key=77de0ebb8c18224df76cf38477a907f5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
    const url = "https://api.themoviedb.org/3/search/movie?api_key=77de0ebb8c18224df76cf38477a907f5&query=" + search;

    const response_default = await fetch(url_default)
    const response = await fetch(url);

    const responseJson_default = await response_default.json();
    const responseJson = await response.json();


      if (responseJson.results) {
      setMovies(responseJson.results)
    } else {
      setMovies(responseJson_default.results)
    }
  }

  useEffect(() => {
    getMovie(search);
  }, [search]);

  const addList = (movie) => {
    const newList = [...mylist, movie];
    setList(newList);
  }

  const removeList = (movie) => {
    const newList = mylist.filter(
      (item) => item.id !== movie.id
    );
    setList(newList);
  }

  return (
    <div className="overlay">
        <div className="topbar">
          <h1 className="header">SINEMA</h1>
          <Searchbox search={search} setSearch={setSearch} />
        </div>
            <Movielist title={"Movies"} movies={movies} handlelist={addList} function={"ADD TO LIST"} />
            <Movielist title={"Mylist"} movies={mylist} handlelist={removeList} function={"REMOVE FROM LIST"} />
    </div>
  );
}

export default App;
