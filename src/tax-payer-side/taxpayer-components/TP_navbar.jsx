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
            <ul className='__links-wrapper'>

                <li className={`link ${splitLocation[1] === "dashboard" ? 'active' : ''}`} >
                    <Link  as={NavLink} to='/dashboard'>
                        Dashboard</Link>
                </  li>
                <li className={`link ${splitLocation[1] === "property" ? 'active' : ''}`} >
                    <Link as={NavLink} to='/property'>
                        My Property

                    </Link>
                </li >

                <li className={`link ${splitLocation[1] === "apply-property" ? 'active' : ''}`} >
                    <Link as={NavLink} to='/apply-property'>
                        Application Form

                    </Link>
                </li>


                <button className='logoutBtn' onClick={logout}>Logout</button>

            </ul>
            <div className="hamburger" onClick={() => menu()}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>

    )
}

export default TP_navbar