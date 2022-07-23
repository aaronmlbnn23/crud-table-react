import React, { useContext, useEffect } from 'react'
import { userStore } from '../stores/UserStore'
import Loader from '../components/loader'

const Dashboard = () => {
  const getUser = userStore((state) => state.getUser)
  const loading = userStore((state) => state.loading)
  useEffect(() => {
    getUser()
}, [])

  return (
    <>
    {!loading ? 
      <div className='dashboard-wrapper'>
      Dashboard
    </div>: <Loader/>
    }
   </>
  )
}

export default Dashboard