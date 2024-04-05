import React, { useContext, useState } from 'react'
import AppRouts from './routes/AppRouts'
import './App.css'
import foldersArr from './context/foldersArr'
const App = () => {

  const [folders, setFolders] = useState([]);
  
  return (
    <>
      <foldersArr.Provider
        value={{ folders, setFolders }}
      >
        <AppRouts />
      </foldersArr.Provider>
    </>
  )
}
export default App
