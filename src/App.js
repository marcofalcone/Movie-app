import React, { useState, useEffect } from 'react';
import { Transition, animated } from 'react-spring/renderprops'

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'
import Mobileinfo from './components/Mobileinfo'

import './styles/App.css'


const App = (props) => {
  const [search, setSearch] = useState('')

  const [movies, setMovies] = useState([])
  const [genres, setGenre] = useState({})

  const [mylist, setMylist] = useState([])
  const [alert, setAlert] = useState(false)
  const [isinList, setIsin] = useState(false)

  const [mobileInfo, setMobile] = useState([]) // state for mobile popup
  const [mobileFunction, setFunction] = useState() // state for popup handlelist function
  const [loading, setLoading] = useState(true) // state for loading spinner

  const getSearch = async () => {
    const urlMostPopular = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key={api-key}&query=${search}`;

    const response_MostPopular = await fetch(urlMostPopular);
    const responseJson_MostPopular = await response_MostPopular.json();

    const response_Search = await fetch(urlSearch);
    const responseJson_Search = await response_Search.json();

      if (responseJson_Search.results) {       // set most popular list as default and change it when receiving user input
      setMovies(responseJson_Search.results)
    } else {
      setMovies(responseJson_MostPopular.results)
    }
  }

  const getGenres = async () => {

    const urlAction = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlComedy = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlHorror = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlRomance = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlScifi = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlThriller = "https://api.themoviedb.org/3/discover/movie?api_key={api-key}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

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

    setGenre({...genres,
      action : responseJson_Action.results,
      comedy : responseJson_Comedy.results,
      horror : responseJson_Horror.results,
      romance : responseJson_Romance.results,
      scifi : responseJson_Scifi.results,
      thriller : responseJson_Thriller.results,
    })

    setLoading(false)
    }

    useEffect(() => {
      getSearch();
    }, [search]);    // trigger getSearch function every time the search value changes

    useEffect(() => {
      getGenres();
    }, []);   // trigger the getGenres only on the first render

    const showAlert = () => {
    setAlert(true);
    setTimeout(() =>
    setAlert(false), 800);
  }

  const addList = (movie) => {      // if movie is not present in the newList, add it
    const newList = [...mylist];
    const isPresent = mylist.some(item => movie.id === item.id); //The some() method tests whether at least one element in the array passes the test implemented by the provided function.
    if (!isPresent) {
    newList.push(movie);
    setMylist(newList);
    showAlert()
  }
    else {
    setIsin(true)
    showAlert()
    setTimeout(() =>
    setIsin(false), 850);
  }
  }

  const removeList = (movie) => {   // filter out the selected item
    const newList = mylist.filter(
      item => item.id !== movie.id
    );
    setMylist(newList);
  }

  const toggleAddMobile = (movie) => { // toggle mobile popup and set button function to addList
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'ADD TO LIST',
      action : addList
    })
  }

  const toggleRemoveMobile = (movie) => { // toggle mobile popup and set button function to removeList
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'REMOVE FROM LIST',
      action : removeList
    })
  }

  const closeMobile = () => { // close mobile popup
    setMobile([])
  }

  return (
    <div className="overlay">
      <div className="top">
        <img className="header" src="logo.svg" alt="" />
        <Searchbox search={search} setSearch={setSearch} />
      </div>
        <Movielist loading={loading} toggle={toggleAddMobile} movies={movies} handlelist={addList} function={"ADD TO LIST"} id={"search"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Action"} movies={genres.action} handlelist={addList} function={"ADD TO LIST"} id={"action"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Comedy"} movies={genres.comedy} handlelist={addList} function={"ADD TO LIST"} id={"comedy"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Horror"} movies={genres.horror} handlelist={addList} function={"ADD TO LIST"} id={"horror"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Romance"} movies={genres.romance} handlelist={addList} function={"ADD TO LIST"} id={"romance"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Sci-fi"} movies={genres.scifi} handlelist={addList} function={"ADD TO LIST"} id={"scifi"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Thriller"} movies={genres.thriller} handlelist={addList} function={"ADD TO LIST"} id={"thriller"} />
        <Movielist loading={loading} toggle={toggleRemoveMobile} title={"My list"} movies={mylist} handlelist={removeList} function={"REMOVE FROM LIST"} id={"mylist"} />
        <Transition
           native
           items={mobileInfo}
           from={{ opacity: 0, height: 0}}
           enter={{ opacity: 1, height: 500 }}
           leave={{ opacity: 0, height: 0 }}
           config={{ duration: 200 }}
           >
           {show =>
             show && (props =>
               <animated.div className="popup" style={props}>
               <Mobileinfo movie={mobileInfo} close={closeMobile} handlelist={mobileFunction.action} function={mobileFunction.tag}  />
               </animated.div>)
           }
        </Transition>
        <Transition
           native
           items={alert}
           from={{ opacity: 0 }}
           enter={{ opacity: 1 }}
           leave={{ opacity: 0 }}
           config={{ duration: 100 }}
           >
           {show =>
             show && (props =>
               <animated.div className="alert" style={props}>
                {!isinList ? <p>ADDED TO LIST</p> : <p>ALREADY ADDED</p>}
               </animated.div>)
           }
        </Transition>
  <footer>Work by Marco Falcone</footer>
  </div>
  )
}

export default App;
