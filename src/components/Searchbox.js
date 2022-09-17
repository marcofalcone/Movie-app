import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Searchbox.css';
import userLogo from '../assets/userLogo.png';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Searchbox = () => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);

  const Dropdown = () => {
    const ref = useDetectClickOutside({ onTriggered: () => setShowDropdown(false) });
    return (
      <div ref={ref} className='dropDown'>
        <span style={{ borderBottom: '1px solid #04b4e3' }}>USERNAME</span>
        <p>Change email</p>
        <p>Change password</p>
        <p>Change user</p>
        <p>Sign out</p>
      </div>
    );
  };
  return (
    <div className='topRight'>
      <input onChange={(event) => history.push(event.target.value ? `/search/${event.target.value}` : '/')} className="searchbox" placeholder="search movies ..."></input>
      <div className='logoWrapper'>
        <img onClick={() => setShowDropdown(!showDropdown) } className="userLogo" src={userLogo} alt="" />
        {showDropdown ? <Dropdown /> : null}
      </div>
    </div>
  );
};

export default Searchbox;
