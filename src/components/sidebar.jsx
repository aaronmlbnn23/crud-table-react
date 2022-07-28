import {useState, useEffect} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/images/logo.png';
import { MdDashboard, MdManageAccounts, MdPerson, MdList } from 'react-icons/md'
import { userStore } from '../stores/UserStore';
import { RiBuildingFill, RiRoadMapFill } from 'react-icons/ri'

const sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/')

  const user = userStore((state) => state.user)


  return (
    <aside className='aside-admin'>
      <div className='sidebar-wrapper'>
        <div className='logo-wrapper'>
          {/** <img className='logo' src={Logo} alt="LOGO" /> */}
          <div className='logo-name'>Logo</div>
        </div>

       <div className='menu-wrapper'>
          <Link className={`link ${splitLocation[1] == "admin-dashboard" ? 'active' : ''}`} as={NavLink} to='/admin-dashboard'>
            <MdDashboard className='menu-icon' />
            Dashboard</Link>
          <Link className={`link ${splitLocation[1] == "accounts" ? 'active' : ''}`} as={NavLink} to='/accounts'>
            <MdManageAccounts className='menu-icon' />
            Accounts
          </Link>
          <Link className={`link ${splitLocation[1] == "applications" ? 'active' : ''}`} as={NavLink} to='/applications'>
            <MdList className='menu-icon' />
            Applications
          </Link>
          <Link className={`link ${splitLocation[1] == "properties" ? 'active' : ''}`} as={NavLink} to='/properties'>
            <RiBuildingFill className='menu-icon' />
            Properties
          </Link>
          <Link className={`link ${splitLocation[1] == "geomap" ? 'active' : ''}`} as={NavLink} to='/geomap'>
            <RiRoadMapFill className='menu-icon' />
            Geomapping
          </Link>

        </div>

      </div>
    </aside>
  )
}

export default sidebar