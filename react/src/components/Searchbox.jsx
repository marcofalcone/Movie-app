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

  const handleOnChange = (event) => {

    if (event.target.value) {
      history.replace({
        pathname: '/search',
        search: `?movie=${event.target.value}`
      });
    } else {
      history.push('/');
    }
  };

  const {
    user
  } = JSON.parse(localStorage.getItem('user')) ?? {};

  const Dropdown = () => {
    const ref = useDetectClickOutside({ onTriggered: () => setShowDropdown(false) });
    const logout = async () => {
      const requestOptions = {
        method: 'PUT',
      };
      const res = await fetch(`/api/users/logout/${user}`, requestOptions);
      const resJson = await res.json();
      if (resJson?.code === 1) {
        await checkUser();
        history.push('/');
      }
      else notifyError();
      localStorage.clear();
    };

    return (
      <div ref={ref} className='dropDown'>
        <span style={{ borderBottom: '1px solid #04b4e3' }}>{user}</span>
        <p onClick={() => logout()}>Sign out</p>
      </div>
    );
  };
  return (
    <div className='topRight'>
      <input onChange={handleOnChange}
        className="searchbox" placeholder="search movies ..."></input>
      <div className='logoWrapper'>
        <img onClick={() => setShowDropdown(!showDropdown) } className="userLogo" src={userLogo} alt="" />
        {showDropdown ? <Dropdown /> : null}
      </div>
    </div>
  );
};

export default Searchbox;
