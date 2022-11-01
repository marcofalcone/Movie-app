import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

const apiKey = '77de0ebb8c18224df76cf38477a907f5'
const imgUrl = 'https://image.tmdb.org/t/p/w500'

const ContextInitial = {
  apiKey: '',
  imgUrl: ''
}

export const Context = React.createContext(ContextInitial)

const context = {
  apiKey,
  imgUrl
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={context}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
