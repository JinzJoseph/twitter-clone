import React from 'react'
import LeftSideBar from './LeftSideBar'
import Feed from './Feed'
import RightSideBar from './RightSideBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
  return (
    <div className='flex justify-between container mx-auto w-full h-full'>
      <LeftSideBar/>
      <Outlet/>
      <RightSideBar/>
      <ToastContainer />
    </div>
  )
}

export default Home
