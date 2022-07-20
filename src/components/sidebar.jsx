import {useState, useEffect} from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/images/logo.png';
import { MdDashboard, MdManageAccounts, MdPerson, MdList } from 'react-icons/md'
import { userStore } from '../stores/UserStore';


const sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split('/')

  const user = userStore((state) => state.user)


  return (
    <aside className='aside-admin'>
      <div className='sidebar-wrapper'>
        <div className='logo-wrapper'>
          <img className='logo' src={Logo} alt="LOGO" />
          <div className='logo-name'>Aaron UI</div>
        </div>

        {user && (user.role == 'admin' || user.role == 'user') ? <div className='menu-wrapper'>
          <Link className={`link ${splitLocation[1] == "dashboard" ? 'active' : ''}`} as={NavLink} to='/dashboard'>
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

        </div> :
          <div className='menu-wrapper'>
            <Link className={`link ${splitLocation[1] === "dashboard" ? 'active' : ''}`} as={NavLink} to='/dashboard'>
              <MdDashboard className='menu-icon' />
              Dashboard</Link>
            <Link className={`link ${splitLocation[1] === "property" ? 'active' : ''}`} as={NavLink} to='/property'>

              <MdManageAccounts className='menu-icon' />
              My Property

            </Link>
          </div>
        }

      </div>
    </aside>
  )
}

export default sidebar