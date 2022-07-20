import React from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdDashboard, MdManageAccounts, MdPerson } from 'react-icons/md'
import { userStore } from '../../stores/UserStore'

const TP_menu = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split('/')
    const logoutUser = userStore((state) => state.logout)
    const navigate = useNavigate()
    const logout = async () => {
        await logoutUser();
    }


    return (
        <aside className='__menu-wrapper'>

            <div className='__menu-links-wrapper'>

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

        </aside>
    )
}

export default TP_menu