import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../taxpayer-components/TP_navbar'
import Sidebar from '../../components/sidebar'
import { userStore } from '../../stores/UserStore'
import { useNavigate  } from 'react-router'
import ApplyForm from '../taxpayer-components/applyForm'
import TP_menu from '../taxpayer-components/TP_menu'
const TP_Layout = () => {
    const user = userStore((state) => state.user) 
    const getUser = userStore((state) => state.getUser)
    const navigate = useNavigate()
  
    useEffect(() => {
        if(!user.token) {
            navigate('/login')
        }
    }, [user])
  
    return (
        <>
            
            <Navbar />
            
            <main className='main-tp'>
            <TP_menu />
                <Outlet />
            </main>
        </>
    )
}

export default TP_Layout