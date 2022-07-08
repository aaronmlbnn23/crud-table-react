import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../contexts/AuthProvider'

import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai'
import { MdOutlineNotifications } from 'react-icons/md'
import { userStore } from '../stores/UserStore';
import Profile from '../assets/images/Me2.png'
import { Link, NavLink,} from 'react-router-dom'
import { useNavigate  } from 'react-router'
const navbar = () => {

  useEffect(() => {
    getUser()
  }, [])
  const getUser = userStore((state) => state.getUser)
  const logoutUser = userStore((state) => state.logout)
  const [collapse, setCollapse] = useState(false)
  const user = userStore((state) => state.user)
  const navigate = useNavigate();
 
  const toggleSidebar = () => {
    const sidebar = document.querySelector("aside")
    sidebar.classList.toggle("collapse");
    setCollapse(collapse => !collapse)
  }
  const toggleDropdown = () => {
    const dropdown = document.querySelector('.dropdown')
    dropdown?.classList?.toggle('active') 
  }
  const logout = () => {
    logoutUser().then(() => {
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    })
  }

  return (
    <nav>
      <div className='nav-wrapper'>
        {collapse ? <AiOutlineMenuUnfold className='toggle-icon' onClick={toggleSidebar} /> : <AiOutlineMenuFold className='toggle-icon' onClick={toggleSidebar} />}

        <div className='user-wrapper'>
          <div className='username'>

            <img src={Profile} alt="user-icon" className='user-icon' onClick={toggleDropdown} />
          </div>
          <div className='dropdown'>
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