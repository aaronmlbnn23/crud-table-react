import React, { useContext, useEffect } from 'react'
import { userStore } from '../stores/UserStore'


const Dashboard = () => {
  const getUser = userStore((state) => state.getUser)
  useEffect(() => {
    getUser()
}, [])

  return (
    <div className='dashboard-wrapper'>
      Dashboard
    </div>
  )
}

export default Dashboard