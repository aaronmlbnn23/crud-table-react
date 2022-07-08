import Views from './views'
import Navbar from './components/navbar'
import { useEffect, useContext, useState } from 'react'
import AuthContext from './contexts/AuthProvider'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'
import Sidebar from './components/sidebar'

function App() {

  const {auth, setAuth} = useContext(AuthContext)
  const navigate = useNavigate()
 const user = sessionStorage.getItem('user')
  //const data = JSON.parse(user)
  
  return (
    <>  
   
    <Views/>
    </>

  )
}

export default App
