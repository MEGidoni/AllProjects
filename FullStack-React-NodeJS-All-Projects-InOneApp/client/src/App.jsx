import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AppRouts from './routes/AppRouts'
import UserContext from './context/userContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { AUTH_USER_URL } from './routes/URLS'
import Loading from './shared/Loading'
import dotenv from 'dotenv'

// dotenv.config();

function App() {
  const [user , setUser] = useState(null);
  const [loading , setLoading] = useState(true);
  const authUser = async ()=>{
    try {
      const {data} = await axios.post(AUTH_USER_URL);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  useEffect(()=>{
    authUser();
  },[])
  return (
    <UserContext.Provider value={{user , setUser ,loading , setLoading}}>
    <BrowserRouter>
    <Loading on={loading}/>
    <AppRouts/>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
