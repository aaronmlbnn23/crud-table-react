import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthProvider'

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { userStore } from '../stores/UserStore';
import Profile from '../assets/images/Me2.png'
import { Link, NavLink, } from 'react-router-dom'
import { useNavigate } from 'react-router'
const navbar = () => {

  const logoutUser = userStore((state) => state.logout)
  const [collapse, setCollapse] = useState(false)
  const user = userStore((state) => state.user)
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false)
  const loading = userStore((state) => state.loading)
  const navItems = document.querySelector('.nav-items')

  const toggleSidebar = () => {
    const sidebar = document.querySelector("aside")
    sidebar.classList.toggle("collapse");
    setCollapse(collapse => !collapse)
  }
  const toggleDropdown = () => {
    setDropdown(current => !current)
  }
  const logout = async () => {
    navItems?.classList.remove('active')
    await logoutUser();
    navigate('/login')
  }

  return (
    <nav>
      <div className='nav-wrapper'>
        {collapse ? <AiOutlineMenuUnfold className='toggle-icon' onClick={toggleSidebar} /> : <AiOutlineMenuFold className='toggle-icon' onClick={toggleSidebar} />}

        <div className='user-wrapper'>
          <div className='username'>

            <img src={Profile} alt="user-icon" className='user-icon' onClick={toggleDropdown} />
          </div>
          <div className={`dropdown ${dropdown ? 'active' : ''}`}>
            <ul className='dropdown-items'>

              <li><Link className="profile-link" as={NavLink} to='./profile'>{user.name}</Link></li>
              <li onClick={logout}>Logout</li>
            </ul>
          </div>

        </div>




      </div>
    </nav>
  )
}

export default navbar