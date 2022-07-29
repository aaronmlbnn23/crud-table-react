import React, {useEffect, useState} from 'react'
import AdminMap from '../components/admin-map'
import { propertyStore } from '../stores/PropertyStore'
import { userStore } from '../stores/UserStore'

const Geomap = () => {
  const geomapCoordinates = propertyStore((state) => state.geomapCoordinates)
  const setDataPoints = propertyStore((state) => state.setDataPoints)
  const fetchGeomap = propertyStore((state) => state.fetchGeomap)
  const user = userStore((state) => state.user)
  const getUser = userStore((state) => state.getUser)
  const propertyData = propertyStore((state) => state.propertyData)

  useEffect(() => {
    const getGeomap = async () => {
      getUser()
      await fetchGeomap(user.token);
      document.title = 'Geomap - RPT'
    };
    getGeomap();
  }, []);

  console.log(propertyData)


  return (
    <div className='geomap-wrapper'>
        <AdminMap token={user.token}/>
    </div>
  )
}

export default Geomap