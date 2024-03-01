import React, { Fragment } from 'react'
import SideBar from '../components/Layouts/SideBar'

const Profile = () => {
  return (
    <Fragment>
        <SideBar/>
        <main id="main" className="main">
            <div className="pagetitle">
                <h1><i className="bi bi-chevron-right"></i> User Profile</h1>
            </div>
            <section className='section dashboard'>
                <h2>This is user profile page</h2>
            </section>
        </main>
    </Fragment>
  )
}

export default Profile