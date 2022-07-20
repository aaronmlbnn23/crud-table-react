import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdDashboard, MdManageAccounts, MdPerson } from 'react-icons/md'
import { userStore } from '../../stores/UserStore'

const TP_navbar = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split('/')
    const logoutUser = userStore((state) => state.logout)
    const navigate = useNavigate()
    const logout = async () => {
        await logoutUser();
    }
    const menu = () => {
        const hamburger = document.querySelector('.hamburger');
        const menu = document.querySelector('.__menu-wrapper')
        hamburger.classList?.toggle('active')
        menu.classList?.toggle('active');
    };


    return (
        <nav className='__navbar-wrapper'>

            <div className='logo-wrapper'>
                <h1>Logo</h1>
            </div>
            <div className='__links-wrapper'>

                <Link className={`link ${splitLocation[1] === "dashboard" ? 'active' : ''}`} as={NavLink} to='/dashboard'>

                    Dashboard</Link>
                <Link className={`link ${splitLocation[1] === "property" ? 'active' : ''}`} as={NavLink} to='/property'>
                    My Property

                </Link>
                <Link className={`link ${splitLocation[1] === "apply-property" ? 'active' : ''}`} as={NavLink} to='/apply-property'>
                    Application Form

                </Link>

                <button className='logoutBtn' onClick={logout}>Logout</button>

               

            </div>
            <div className="hamburger" onClick={() => menu()}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
        </nav>
        
    )
}

export default TP_navbar