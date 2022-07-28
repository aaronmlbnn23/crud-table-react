import React, { useContext, useEffect } from 'react'
import { userStore } from '../stores/UserStore'
import Loader from '../components/loader'
import {useLocation} from 'react-router-dom'

const Dashboard = () => {
  const getUser = userStore((state) => state.getUser)
  const loading = userStore((state) => state.loading)
  const user =userStore((state) => state.user)
  useEffect(() => {
    getUser()
}, [])
console.log(user.token)
  useEffect(() => {
    document.title = 'Dashboard - RPT'
  }, [])

  return (
    <>
    
      <div className='dashboard-wrapper'>
      Dashboard
    </div>
  
   </>
  )
}

export default Dashboard