import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/images/logo.png';
import { MdDashboard, MdManageAccounts, MdPerson } from 'react-icons/md'

const sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/')
 
  return (
    <aside>
      <div className='sidebar-wrapper'>
        <div className='logo-wrapper'>
          <img className='logo' src={Logo} alt="LOGO" />
          <div className='logo-name'>Aaron UI</div>
        </div>
        <div className='menu-wrapper'>
          <Link className={`link ${splitLocation[1] === "dashboard" ? 'active' : ''}`} as={NavLink} to='/dashboard'>
            <MdDashboard className='menu-icon' />
            Dashboard</Link>
          <Link className={`link ${splitLocation[1] === "accounts" ? 'active' : ''}`} as={NavLink} to='/accounts'>

            <MdManageAccounts className='menu-icon' />
            Accounts

          </Link>
        </div>
      </div>
    </aside>
  )
}

export default sidebar