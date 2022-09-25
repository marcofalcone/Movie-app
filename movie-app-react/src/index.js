import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { BrowserRouter } from 'react-router-dom';

const apiKey = '77de0ebb8c18224df76cf38477a907f5';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

export const Context = React.createContext();

const context = {
  apiKey,
  imgUrl,
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={context}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
