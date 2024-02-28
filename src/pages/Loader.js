import React from 'react'

const Loader = ({ popup }) => {
  return (
    <div className={`${ !popup ? 'd-flex justify-content-center align-items-center center-page' : 'loader-for-popup'}`}>
        <div className='spinner-border'>
            <span className='sr-only'></span>
        </div>
    </div>
  )
}

export default Loader