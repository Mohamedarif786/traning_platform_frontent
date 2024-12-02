import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div>
      <div className='header'>
        <Navbar />
      </div>
      <div className='main-content'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MainLayout