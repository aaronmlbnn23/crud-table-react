import React from 'react'
import { Routes, Route, Outlet, NavLink, Link } from 'react-router-dom'
import Home from './Home'
import Dashboard from './Dashboard'
import Navbar from '../components/navbar'
import ProtectedRoutes from '../ProtectedRoutes'
import Profile from './Profile'
import Sidebar from '../components/sidebar'
const Layout = () => {
    return (
        <>  
            <Sidebar/>
            <main>
            <Navbar />
            <Outlet/>
            </main>
        </>
    )
}

export default Layout