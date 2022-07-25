import React from 'react'

const toaster = ({message, status, approveStatus}) => {
  return (
    <div className={`toaster-wrapper ${status == 'success' ? 'success' : 'error'}  ${approveStatus ? 'approveSuccess' : 'approveError'}`}>
        <div className={`toaster-message ${status == 'success' ? 'success' : 'error'}`}>
            <span>{message}</span>
        </div>
    </div>
  )
}

export default toaster