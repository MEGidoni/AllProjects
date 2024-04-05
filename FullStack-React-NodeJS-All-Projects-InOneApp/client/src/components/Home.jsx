import React from 'react'
import { Outlet } from 'react-router-dom'
const Home = () => {
  
  return (
    <>
      <div className="w-10">
        <iframe className='p-0' src='https://naya-therapy-by-animals.netlify.app/' width={1515} height={1525}></iframe>
      </div>
      <br />
      <br />
      {/* <Outlet /> */}
    </>
  )
}

export default Home