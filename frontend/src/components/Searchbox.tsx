import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/Searchbox.css'
import userLogo from '../assets/userLogo.png'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { notifyError } from './Alert'

const Searchbox = ({ checkUser }: { checkUser: () => void }): JSX.Element => {
  const history = useHistory()
  const [showDropdown, setShowDropdown] = useState(false)

  const {
    user
  }: { user: string } = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user') ?? '') : ''

  const handleOnChange = (input: string): void => {
    if (input !== '') {
      history.replace({
        pathname: '/search',
        search: `?movie=${input}`
      })
    } else {
      history.push('/')
    }
  }

  const Dropdown = (): JSX.Element => {
    const ref = useDetectClickOutside({ onTriggered: () => setShowDropdown(false) })
    const handleLogout = async (): Promise<void> => {
      const requestOptions = {
        method: 'PUT'
      }
      const res = await (await fetch(`/api/users/logout/${user}`, requestOptions)).json()

      if (res?.code === 1) {
        checkUser()
        history.push('/')
        localStorage.clear()
      } else notifyError()
    }

    return (
      <div ref={ref} className='dropDown'>
        <span style={{ borderBottom: '1px solid #04b4e3' }}>{user}</span>
        <p onClick={() => {
          void handleLogout()
        }}>Sign out</p>
      </div>
    )
  }
  return (
    <div className='topRight'>
      <input onChange={(e) => handleOnChange(e.target.value)}
        className="searchbox" placeholder="search movies ..."></input>
      <div className='logoWrapper'>
        <img onClick={() => setShowDropdown(!showDropdown) } className="userLogo" src={userLogo} alt="" />
        {showDropdown ? <Dropdown /> : null}
      </div>
    </div>
  )
}

export default Searchbox
