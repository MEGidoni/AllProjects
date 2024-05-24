import React, { useContext } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import styles from '../css/nav.module.css'
import UserContext from '../context/userContext'
import axios from 'axios'
import { LOGOUT_URL } from '../routes/URLS';
const NavBar = () => {
  const { user, setUser } = useContext(UserContext)
  return (
    <>
      <header className='mb-1'>
        <nav className={user && 'bg-slate-500 h-[50px] text-center p-10 flex justify-between items-center' || 'bg-slate-500 h-[50px] text-center p-10 flex items-center justify-center'}>
          <div>
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/'}>Home </NavLink>
            {!user &&
              <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/SIGNUP'}>SignUp </NavLink>
            }
            {!user &&
              <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/LOGIN'}>LogIn</NavLink>
            }
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/PRODUCTS'}>Products</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/MAP'}>Map</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/NOTES'}>Notes</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/airforce'}>AirForce</NavLink>
            <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/433'}>433</NavLink>
          </div>
          {
            user &&
              <h1 className='items-center text-center text-3xl text-green-500 pe-[7.75rem] '>Welcome {user?.name}!</h1>
          }
          {
            user &&
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded me-3 focus:outline-none focus:shadow-outline"
              onClick={async () => {
                setUser(null);
                await axios.post(LOGOUT_URL);
              }}
            >LogOut</button>
          }
        </nav>
      </header>
      <Outlet />
    </>

  )
}

export default NavBar