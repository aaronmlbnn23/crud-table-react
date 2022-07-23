import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { propertyStore } from '../stores/PropertyStore'
import { userStore } from '../stores/UserStore'
import Map from '../tax-payer-side/taxpayer-components/map'
import Loader from '../components/loader'
const ReviewApplications = () => {
  const { id } = useParams()
  const getApplication = userStore((state) => state.fetchApplication)
  const getUser = userStore((state) => state.getUser)
  const application = userStore((state) => state.application)
  const [imageUrl, setImageUrl] = useState()
  const approveApplication  = propertyStore((state) => state.approveApplication)
  const [token, setToken] = useState()
  const user = userStore((state) => state.user)
  const loading = userStore((state) => state.loading)
  useEffect(() => {
    getUser()
    setToken(user.token)
  }, [])

  useEffect(() => {
    
    getApplication(id)
  }, [id])


  

  const handleApprove = (data) => {
      approveApplication(data, token)
  }

  return (
    <>
      {application && !loading ? <div className='review-application-wrapper'>

        <div className='review-container'>

          <div className='review-items'>
            ReviewApplications

            <span>Tax declaration number: {application.tdId}</span>
            <span>Owner Name: {application.name}</span>
            <span>Classification: {application.classification}</span>
            <span>Address: {application.address}</span>
            <span>Assessed Value: {application.assessedValue}</span>
            <span>Status: {application.status}</span>

            <img src={`http://localhost:8000/storage/images/${application.image && application.image.split('/')[2]}`} alt="" />
          </div>

          <button className='approveBtn btn-primary' onClick={() => handleApprove(application)}>Approve</button>
        </div>
        <div className='__map-wrapper'>
          <Map appCoords={application.coordinates} />
        </div>
      </div>: <Loader/>}

    </>
  )
}

export default ReviewApplications