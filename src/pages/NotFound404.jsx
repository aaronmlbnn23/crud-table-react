import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NotFound404 = () => {
  const user = localStorage.getItem('user')
  const navigate = useNavigate()
  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }
  }, [user])


  return (
    <div>NotFound404</div>
  )
}

export default NotFound404