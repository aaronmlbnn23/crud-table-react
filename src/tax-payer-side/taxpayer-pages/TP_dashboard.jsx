import React, { useState, useEffect } from 'react'
import { propertyStore } from '../../stores/PropertyStore'
import { userStore } from '../../stores/UserStore'
import shallow from 'zustand/shallow'
import Map from '../taxpayer-components/map'
import Loader from '../../components/loader'
import {Link} from 'react-router-dom'

const TP_dashboard = () => {
  const user = userStore((state) => (state.user), shallow)
  const getUser = userStore((state) => state.getUser)
  const fetchMyProperty = propertyStore((state) => state.fetchMyProperty)
  const myProperty = propertyStore((state) => state.myProperty)
  const loading = propertyStore((state) => state.loading)
  useEffect(() => {
    getUser()

  }, [])

  useEffect(() => {
    fetchMyProperty(user.id, user.token)
  }, [user])

  return (
    <div className='__dashboard-wrapper'>

      <nav className='property-header'>
        <div className='header-items'>
          <h2>My Property</h2>
          <Link to="/apply-property" className='btn-primary addNewPropertyBtn'>Add New</Link>
        </div>
      </nav>


      <div className='dashboard-header'>
        <div className='header-wrapper'>
          <h1>Welcome to Dashboard</h1>
        </div>
      </div>

      {myProperty &&
        myProperty.map((property) => (

          <div className='property-item' key={property.id}>
            <div className='__property-item-wrapper'>
              <div className='__property-name'>
                <span>{property.tdId}</span>
                <span>{property.name}</span>
              </div>
              <div className='__property-other-info'>
                <span>{property.address}</span>

              </div>

            </div>


          </div>)
        )
      }


    </div>
  )
}

export default TP_dashboard