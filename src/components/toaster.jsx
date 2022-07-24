import React from 'react'

const toaster = ({message, status}) => {
  return (
    <div className={`toaster-wrapper ${status ? 'success' : 'error'}`}>
        <div className={`toaster-message ${status ? 'success' : 'error'}`}>
            <span>{message}</span>
        </div>
    </div>
  )
}

export default toaster