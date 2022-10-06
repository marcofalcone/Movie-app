import React, { useContext, useEffect, useState } from 'react';
import { Context } from '..';
import Movielist from '../components/Movielist';

import '../styles/App.css';

const Homepage = () => {
  const { apiKey } = useContext(Context);
  const [isFetching, setIsFetching] = useState(true);

  const [movies, setMovies] = useState({
    popular: [],
    favorites: [],
    genres: {
      action : [],
      comedy : [],
      horror : [],
      romance : [],
      scifi : [],
      thriller : [],
    }
  });

  const {
    email,
  } = JSON.parse(localStorage.getItem('user')) ?? {};

  const getMovies = async () => {

    const urlAction = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlComedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&ssort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlHorror = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlRomance = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlScifi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;
    const urlThriller = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=53&sort_by=popularity.desc&language=en-US&include_adult=false&include_video=true&page=1`;

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

    const response_Favorites = await fetch(`/api/movies/favorites/${email}`);
    const favoriteJson = await response_Favorites.json();

    if (responseJson_Action
      && responseJson_Comedy
      && responseJson_Horror
      && responseJson_Romance
      && responseJson_Scifi
      && responseJson_Thriller
      && favoriteJson
      && responseJson_MostPopular?.results) {
      setMovies({
        ...movies,
        popular: responseJson_MostPopular?.results,
        favorites: favoriteJson?.list,
        genres: {
          action : responseJson_Action?.results,
          comedy : responseJson_Comedy?.results,
          horror : responseJson_Horror?.results,
          romance : responseJson_Romance?.results,
          scifi : responseJson_Scifi?.results,
          thriller : responseJson_Thriller?.results,
        }
      });
    }

    setIsFetching(false);
  };

  const {
    popular,
    genres,
    favorites,
  } = movies;

  const {
    action,
    comedy,
    horror,
    romance,
    scifi,
    thriller,
  } = genres;

  const genresList = [
    {
      title: 'Trending now',
      items: popular,
      id: 'popular'
    },
    {
      title: 'Action',
      items: action,
      id: 'action'
    },
    {
      title: 'Comedy',
      items: comedy,
      id: 'comedy'
    },
    {
      title: 'Horror',
      items: horror,
      id: 'horroe'
    },
    {
      title: 'Romance',
      items: romance,
      id: 'romance'
    },
    {
      title: 'Sci-fi',
      items: scifi,
      id: 'scifi'
    },
    {
      title: 'Thriller',
      items: thriller,
      id: 'thriller'
    },
    {
      title: 'My list',
      items: favorites,
      id: 'myList'
    }
  ];

  useEffect(() => {
    getMovies();
  }, []);

  return genresList.map((genre) => (
    <Movielist
      key={genre.id}
      isFetching={isFetching}
      title={genre.title}
      movies={genre.items}
      id={genre.id}
      favorites={favorites}
    />
  ));
};

export default Homepage;
