import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import userLogo from '../assets/userLogo.png'
import { useDetectClickOutside } from 'react-detect-click-outside'

const Searchbox = ({ setIsLogged }: { setIsLogged: (prop: boolean) => void }): JSX.Element => {
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
      localStorage.clear()
      setIsLogged(false)
    }

    return (
      <div ref={ref} className='bg-black p-2 absolute right-0 top-10 border-2 rounded-md border-sky-500'>
        <span className='border-b-2 border-b-sky-500 text-2xl text-sky-500'>{user}</span>
        <p className='cursor-pointer hover:text-sky-500 transition mt-2 text-xl text-slate-50' onClick={() => {
          void handleLogout()
        }}>Sign out</p>
      </div>
    )
  }
  return (
    <div className='flex gap-5 items-center'>
      <input onChange={(e) => handleOnChange(e.target.value)}
        className='text-1xl bg-transparent text-gray-50 border-2 rounded-md border-sky-500 p-1 focus:outline-none' placeholder="search movies ..."></input>
      <div className='relative'>
        <img onClick={() => setShowDropdown(!showDropdown) } className="h-7 cursor-pointer" src={userLogo} alt="" />
        {showDropdown ? <Dropdown /> : null}
      </div>
    </div>
  )
}

export default Searchbox
