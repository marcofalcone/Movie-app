import React from 'react';
import Movielist from '../components/Movielist'

import '../styles/App.css'

const Homepage = (props) => {

  const {
    isFetching,
    movies,
  } = props;

  const {
    popular,
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

  return (
    <>
      <Movielist isFetching={isFetching} title={"Trending Now"} movies={popular} id={"search"} />
      <Movielist isFetching={isFetching} title={"Action"} movies={action} id={"action"} />
      <Movielist isFetching={isFetching} title={"Comedy"} movies={comedy} id={"comedy"} />
      <Movielist isFetching={isFetching} title={"Horror"} movies={horror} id={"horror"} />
      <Movielist isFetching={isFetching} title={"Romance"} movies={romance} id={"romance"} />
      <Movielist isFetching={isFetching} title={"Sci-fi"} movies={scifi} id={"scifi"} />
      <Movielist isFetching={isFetching} title={"Thriller"} movies={thriller} id={"thriller"} />
      {/* <Movielist isFetching={isFetching} title={"My list"} movies={mylist} function={"REMOVE FROM LIST"} id={"mylist"} /> */}
    </>
  )
}

export default Homepage;
