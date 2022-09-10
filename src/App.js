import React, { useState, useEffect } from 'react';
import { Transition, animated } from 'react-spring/renderprops'

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'
import Mobileinfo from './components/Mobileinfo'

import './styles/App.css'


const App = () => {
  const [search, setSearch] = useState('')

  const [movies, setMovies] = useState({
    popular: [],
    searched: [],
    genres: {
      action : [],
      comedy : [],
      horror : [],
      romance : [],
      scifi : [],
      thriller : [],
    }
  })

  const {
    popular,
    searched,
    genres,
  } = movies;

  const {
    action,
    comedy,
    horror,
    romance,
    scifi,
    thriller,
  } = genres;

  const [mylist, setMylist] = useState([])
  const [alert, setAlert] = useState(false)
  const [isinList, setIsin] = useState(false)
  const [mobileInfo, setMobile] = useState([])
  const [mobileFunction, setFunction] = useState()
  const [loading, setLoading] = useState(true)

  const apiKey = "77de0ebb8c18224df76cf38477a907f5";
  // const getSuggestedForYou

  const getSearched = async () => {
    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${search}`;
    const response_Search = await fetch(urlSearch);
    const responseJson_Search = await response_Search.json();
    if (responseJson_Search?.results) setMovies({
      ...movies,
      searched: responseJson_Search.results
    })
  }

  const getMovies = async () => {

    const urlAction = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;
    const urlComedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;
    const urlHorror = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;
    const urlRomance = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;
    const urlScifi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;
    const urlThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22`;

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

    const urlMostPopular = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    const response_MostPopular = await fetch(urlMostPopular);
    const responseJson_MostPopular = await response_MostPopular.json();

    if (responseJson_Action
      && responseJson_Comedy
      && responseJson_Horror
      && responseJson_Romance
      && responseJson_Scifi
      && responseJson_Thriller
      && responseJson_MostPopular?.results) {
        setMovies({
          ...movies,
          popular: responseJson_MostPopular.results,
          genres: {
            action : responseJson_Action?.results,
            comedy : responseJson_Comedy?.results,
            horror : responseJson_Horror?.results,
            romance : responseJson_Romance?.results,
            scifi : responseJson_Scifi?.results,
            thriller : responseJson_Thriller?.results,
          }
        })
      }

      setLoading(false)
  }

  const showAlert = () => {
    setAlert(true);
    setTimeout(() =>
    setAlert(false), 800);
  }

  const addList = (movie) => {      
    const newList = [...mylist];
    const isPresent = mylist.some(item => movie.id === item.id);
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

  const removeList = (movie) => {
    const newList = mylist.filter(
      item => item.id !== movie.id
    );
    setMylist(newList);
  }

  const toggleAddMobile = (movie) => {
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'ADD TO LIST',
      action : addList
    })
  }

  const toggleRemoveMobile = (movie) => {
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'REMOVE FROM LIST',
      action : removeList
    })
  }

  const closeMobile = () => {
    setMobile([])
  }

  useEffect(() => {
    getMovies();
  }, [])

  useEffect(() => {
    if (search) getSearched();
  }, [search])

  return (
    <div className="overlay">
      {apiKey ? (
        <>
        <div className="topBar">
          <img className="logo" src="logo.svg" alt="" />
          <Searchbox search={search} setSearch={setSearch} />
        </div>
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Trending Now"} movies={popular} handlelist={addList} function={"ADD TO LIST"} id={"search"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Action"} movies={action} handlelist={addList} function={"ADD TO LIST"} id={"action"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Comedy"} movies={comedy} handlelist={addList} function={"ADD TO LIST"} id={"comedy"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Horror"} movies={horror} handlelist={addList} function={"ADD TO LIST"} id={"horror"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Romance"} movies={romance} handlelist={addList} function={"ADD TO LIST"} id={"romance"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Sci-fi"} movies={scifi} handlelist={addList} function={"ADD TO LIST"} id={"scifi"} />
        <Movielist loading={loading} toggle={toggleAddMobile} title={"Thriller"} movies={thriller} handlelist={addList} function={"ADD TO LIST"} id={"thriller"} />
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
           </>
      ) : (
        <h1>YOU NEED TO SET AN API KEY FIRST</h1>
      )}
  <footer>Work by Marco Falcone</footer>
  </div>
  )
}

export default App;
