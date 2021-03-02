import React, { useState, useEffect } from 'react';
import { Spring, Transition, animated } from 'react-spring/renderprops'
import { useMediaQuery } from 'react-responsive'

import Searchbox from "./components/Searchbox"
import Movielist from './components/Movielist'
import ResponsiveMovielist from './components/ResponsiveMovieList'
import Mobileinfo from './components/Mobileinfo'

import './styles/App.css'


const App = (props) => {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1225px)'
  })

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  })


  const [action, setAction] = useState([])
  const [comedy, setComedy] = useState([])
  const [horror, setHorror] = useState([])
  const [romance, setRomance] = useState([])
  const [scifi, setScifi] = useState([])
  const [thriller, setThriller] = useState([])

  const [movies, setMovies] = useState([])
  const [mylist, setMylist] = useState([])

  const [search, setSearch] = useState('')

  const [mobileInfo, setMobile] = useState([]) //state for mobile popup
  const [mobileFunction, setFunction] = useState()

  const getSearch = async () => {
    const urlMostPopular = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key={apikey}&query=${search}`;

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

    const urlAction = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlComedy = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlHorror = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlRomance = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlScifi = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

    const urlThriller = "https://api.themoviedb.org/3/discover/movie?api_key={apikey}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=false&page=1%22";

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

    setAction(responseJson_Action.results)
    setComedy(responseJson_Comedy.results)
    setHorror(responseJson_Horror.results)
    setRomance(responseJson_Romance.results)
    setScifi(responseJson_Scifi.results)
    setThriller(responseJson_Thriller.results)
    }

    useEffect(() => {
      getSearch();
    }, [search]);    //trigger getSearch function every time the search value changes


    useEffect(() => {
      getGenres();
    }, []);   //trigger the getGenres only on the first render

  const addList = (movie) => {      // if movie is not present in the newList, add it
    const newList = [...mylist]
    const isPresent = mylist.some(item => movie.id === item.id)
    if (!isPresent) newList.push(movie)
    setMylist(newList)
  }

  const removeList = (movie) => {   // filter out the selected item
    const newList = mylist.filter(
      item => item.id !== movie.id
    );
    setMylist(newList);
  }

  const toggleAddMobile = (movie) => { //toggle mobile popup and set button function to addList
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'ADD TO LIST',
      action : addList
    })
  }

  const toggleRemoveMobile = (movie) => { //toggle mobile popup and set button function to removeList
    const showItem = []
    showItem.push(movie)
    setMobile(showItem)
    setFunction({
      tag : 'REMOVE FROM LIST',
      action : removeList
    })
  }

  const closeMobile = () => { //close mobile popup
    setMobile([])
  }

  return (
    <>
    <div className="overlay">
      <div className="top">
      <img className="header" src="logo.svg" alt="" />
      <Searchbox search={search} setSearch={setSearch} />
      </div>
        {isDesktopOrLaptop && <>
              <Movielist movies={movies} handlelist={addList} function={"ADD TO LIST"} id={"search"} />
              <Movielist title={"Action"} movies={action} handlelist={addList} function={"ADD TO LIST"} id={"action"} />
              <Movielist title={"Comedy"} movies={comedy} handlelist={addList} function={"ADD TO LIST"} id={"comedy"} />
              <Movielist title={"Horror"} movies={horror} handlelist={addList} function={"ADD TO LIST"} id={"horror"} />
              <Movielist title={"Romance"} movies={romance} handlelist={addList} function={"ADD TO LIST"} id={"romance"} />
              <Movielist title={"Sci-fi"} movies={scifi} handlelist={addList} function={"ADD TO LIST"} id={"scifi"} />
              <Movielist title={"Thriller"} movies={thriller} handlelist={addList} function={"ADD TO LIST"} id={"thriller"} />
              <Movielist title={"My list"} movies={mylist} handlelist={removeList} function={"REMOVE FROM LIST"} id={"mylist"} />
              </>
            }
        {isTabletOrMobileDevice && <>
              <ResponsiveMovielist toggle={toggleAddMobile} movies={movies} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Action"} movies={action} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Comedy"} movies={comedy} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Horror"} movies={horror} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Romance"} movies={romance} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Sci-fi"} movies={scifi} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleAddMobile} title={"Thriller"} movies={thriller} handlelist={addList} />
              <ResponsiveMovielist toggle={toggleRemoveMobile} title={"My list"} movies={mylist} handlelist={removeList} />
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
              </>
            }
  <footer>Work by Marco Falcone</footer>
  </div>
  </>
  )
}

export default App;
