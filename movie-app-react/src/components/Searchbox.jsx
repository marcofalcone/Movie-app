import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Searchbox.css';
import userLogo from '../assets/userLogo.png';
import { useDetectClickOutside } from 'react-detect-click-outside';
import Alert from './Alert';

const Searchbox = ({ checkUser }) => {
  const history = useHistory();
  const [showDropdown, setShowDropdown] = useState(false);
  const {
    notifyError,
  } = Alert();

  const Dropdown = () => {
    const ref = useDetectClickOutside({ onTriggered: () => setShowDropdown(false) });

    const logout = async () => {
      const requestOptions = {
        method: 'PUT',
      };
      const res = await fetch(`/api/users/logout/${localStorage.getItem('username')}`, requestOptions);
      const resJson = await res.json();
      if (resJson?.code === 1) await checkUser();
      else notifyError();
      localStorage.clear();
    };

    return (
      <div ref={ref} className='dropDown'>
        <span style={{ borderBottom: '1px solid #04b4e3' }}>USERNAME</span>
        <p>Change email</p>
        <p>Change password</p>
        <p>Change user</p>
        <p onClick={() => logout()}>Sign out</p>
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
