import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AppRoutes from './routes/AppRoutes'
import infoContext from './hooks/infoContext'

const App = () => {

  const [info, setInfo] = useState(0);

  return (
    <>
      <infoContext.Provider value={{info, setInfo}} >
        <AppRoutes />
      </infoContext.Provider>
    </>
  )
}
export default App
