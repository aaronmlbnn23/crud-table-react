import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { userStore } from '../stores/UserStore'

const LandingPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const getUser = localStorage.getItem('user')
    if(getUser) navigate('/dashboard')
  }, [])

  return (
    <div>LandingPage
      <Link to='/sign-up' as={NavLink}>Sign up</Link>

    </div>
  )
}

export default LandingPage