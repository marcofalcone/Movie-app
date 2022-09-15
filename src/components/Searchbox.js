import React from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Searchbox.css'
import userLogo from "../assets/userLogo.png"

const Searchbox = () => {
  const history = useHistory();
  return (
    <div className='topRight'>
      <input onChange={(event) => history.push(`/search/${event.target.value}`)} className="searchbox" placeholder="search movies ..."></input>
      <img className="userLogo" src={userLogo} alt="" />
    </div>
  )
}

export default Searchbox
