import Views from './views'
import Navbar from './components/navbar'
import { useEffect, useContext, useState } from 'react'
import AuthContext from './contexts/AuthProvider'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar';
import {userStore } from './stores/UserStore'

function App() {  
    
  return (
    <>  
    <Views/>
    </>

  )
}

export default App
