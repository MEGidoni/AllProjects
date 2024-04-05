import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notes from '../pages/Notes'
import SergeyContext from '../context/Context'
import NavBar from '../pages/NavBar'
import Folders from '../pages/Folders'
import notesArr from '../context/notesArr'
import toast from '../context/toast'
import { useState } from 'react'
const AppRouts = () => {
  const [NotesArr, setNotesArr] = useState([]);
  const [opentoast, setOpentoast] = useState(false);
  const [dest,setDest] = useState("");
  return (
    <>
      <toast.Provider
          value={{ opentoast, setOpentoast , dest , setDest  }}
        >
        <notesArr.Provider
          value={{ NotesArr, setNotesArr }}
        >
          <BrowserRouter>
            <Routes>
              <Route path='/' Component={Folders} />
              {/* <Route path='/folders' Component={Folders} /> */}
              <Route path='/notes' Component={Notes} />
              <Route path='*' element={<NavBar>404 not found</NavBar>} />
            </Routes>
          </BrowserRouter>
        </notesArr.Provider>
      </toast.Provider>
    </>
  )
}

export default AppRouts