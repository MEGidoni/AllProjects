import React from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import Home  from "../components/Home";
import NavBar from '../components/NavBar';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';
import Products from '../components/Products/Products';
import Notes from '../components/Notes';
import Map from '../roey/Map';
import AirForce from '../components/AirForce';
import Project433 from '../components/Project433';
const AppRouts = () => {
  return (
    <Routes>
    <Route path='/' element={<NavBar/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/notes' element={<Notes/>}/>
      <Route path='/map' element={<Map/>}/>
      <Route path='/airforce' element={<AirForce/>}/>
      <Route path='/433' element={<Project433/>}/>
      <Route path='*'>404 achi!</Route>
    </Route>

    
    {/* <Route path='/users' element={<h1 className='text-center text-9xl'>users work!</h1>}/>

    <Route path='base' element={<h1 className='text-center text-9xl'>base work!</h1>}>
      <Route path='children' element={<h1 className='text-center text-9xl'>children work!</h1>}/>
    </Route> */}



    </Routes>
  )
}

export default AppRouts