import React, { useContext, useEffect } from 'react'
import NavBar from './NavBar'
import { Button, Label, Modal, Select, Textarea } from 'flowbite-react';
import { useRef, useState } from 'react';
import { v4 as uuid } from "uuid";
import notesArr from '../context/notesArr';
import toast from '../context/toast';
import NoteCard from './NoteCard';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
import MoveNote from '../components/MoveNote';



const options = [
  { name: "PaleSkyBlue", hex: "#add8e6" },
  { name: "Peach", hex: "#ffdab9" },
  { name: "SoftMint", hex: "#98fb98" },
  { name: "Vanilla", hex: "#ffffe0" },
  { name: "Lilac", hex: "#e6e6fa" },
  { name: "SalmonPink", hex: "#ff7f50" },
  { name: "Rose", hex: "#ffb6c1" },
  { name: "BabyBlue", hex: "#a1caf1" },
  { name: "Sand", hex: "#f5deb3" },
  { name: "BlushPink", hex: "#fff0f5" },
  { name: "PaleAqua", hex: "#b0e0e6" },
  { name: "Almond", hex: "#ffefd5" },
  { name: "PetalPink", hex: "#ffe4e1" },
  { name: "Pear", hex: "#f0fff0" },
  { name: "Ivory", hex: "#f5fffa" },
  { name: "Azure", hex: "#f0f8ff" },
  { name: "Beige", hex: "#f5f5dc" },
  { name: "Shell", hex: "#fff5ee" },
  { name: "LightCyan", hex: "#e0ffff" },
  { name: "SoftPink", hex: "#ffb6c1" },
  { name: "Apricot", hex: "#ffa07a" },
  { name: "Champagne", hex: "#fafad2" },
  { name: "PeachPuff", hex: "#ffdab9" },
  { name: "Buttercream", hex: "#fffacd" },
  { name: "Linen", hex: "#faf0e6" },
  { name: "PaleCornflowerBlue", hex: "#87cefa" },
  { name: "FrenchLavender", hex: "#fff0f5" },
  { name: "Creamy", hex: "#ffe4b5" },
  { name: "SoftGold", hex: "#eee8aa" },
  { name: "Silver", hex: "#d3d3d3" },
  { name: "Mauve", hex: "#d8bfd8" },
  { name: "DustyBlue", hex: "#b0c4de" },
  { name: "Turquoise", hex: "#afeeee" },
  { name: "Seafoam", hex: "#20b2aa" },
  { name: "PastelLilac", hex: "#e6e6fa" },
  { name: "SoftRose", hex: "#db7093" },
  { name: "WarmPeach", hex: "#ffdab9" },
  { name: "GentleSkyBlue", hex: "#87ceeb" },
  { name: "MintGreen", hex: "#98fb98" },
  { name: "PaleBeige", hex: "#eee8aa" },
  { name: "GentleBlue", hex: "#b0c4de" },
  { name: "Aqua", hex: "#20b2aa" },
  { name: "MauvePink", hex: "#db7093" },
  { name: "LightPeach", hex: "#ffdab9" },
  { name: "SkyBlue", hex: "#87ceeb" },
  { name: "SoftGreen", hex: "#98fb98" },
  { name: "SoftGray", hex: "#778899" },
  { name: "LightBlue", hex: "#e0ffff" },
  { name: "SoftLilac", hex: "#e6e6fa" }
]
  .map(color => <option style={{background:color.hex}} key={color.name} value={color.hex}>{color.name}</option>)

const Notes = () => {

  console.log("entered notes");

  let currentDate = new Date();
  let dayOfMonth = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();

  const [openModal, setOpenModal] = useState(false);
  const inputRef = useRef(null);
  const colorRef = useRef(null);

  const { NotesArr, setNotesArr } = useContext(notesArr)
  const { opentoast, dest } = useContext(toast)
  const nav = useNavigate();
  const location = useLocation();
  const { folderId, nameOfFolder } = location.state;

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      const parsedNotes = storedNotes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          folderId={note.folderId}
          noteTime={note.noteTime}
          noteContent={note.noteContent}
          bgNoteColor={note.bgNoteColor}
          deleteNote={() => deleteNote(note.id)}
        />
      ));
      setNotesArr(parsedNotes);
    }
  }, []);

  useEffect(() => {
    const serializedNotes = NotesArr.map((note) => ({
      id: note.props.id,
      folderId: note.props.folderId,
      noteTime: note.props.noteTime,
      noteContent: note.props.noteContent,
      bgNoteColor: note.props.bgNoteColor,
    }));
    localStorage.setItem('notes', JSON.stringify(serializedNotes));
  }, [NotesArr]);

  const deleteNote = (id) => {
    setNotesArr((prev) => prev.filter(note => note.props.id !== id));
  };

  return (
    <>
      <div style={{ backgroundImage: "url('https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", minHeight: "641px", backgroundSize: 'cover', backgroundPosition: 'bottom', justifyItems: "center", backgroundAttachment: 'fixed' }}>

        {/* <NavBar /> */}
        <br />
        {
          opentoast
          &&
          <div className='flex justify-center'><MoveNote des_fol={dest} /></div>
        }
        <br />
        <div className='flex flex-row-reverse me-40 mb-10 '>
          <FaArrowRight className='bg-white rounded-lg' size={31} cursor={"pointer"} onClick={() => nav("/")} />
        </div>
        <div className='flex justify-center mb-20 '><h2 className='text-5xl text-green-400 font-mono bg-white rounded-lg p-2'><span className='text-5xl text-sky-400 font-mono underline'>Folder</span> : <span className='text-5xl text-orange-400 font-serif underline'>{nameOfFolder}</span></h2></div>
        <div className='flex justify-center items-center mb-3'>
          <Button pill gradientDuoTone="redToYellow" onClick={() => setOpenModal(true)}>Add Note</Button>
          <Modal initialFocus={inputRef} show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
              <div className="space-y-6">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Write Here..." />
                  </div>
                  <Textarea
                  placeholder='Press Enter To Pass  A Row And Shift To Save Changes...'
                   onKeyDown={(e) => {
                    if (e.key == "Shift") {
                      if (inputRef.current.value && colorRef.current.value) {
                        let ID = uuid();
                        setNotesArr([...NotesArr, <NoteCard
                          key={ID}
                          id={ID}
                          noteTime={{ dayOfMonth, month, year, hour, minutes, seconds }}
                          folderId={folderId}
                          noteContent={inputRef.current.value}
                          bgNoteColor={colorRef.current.value}
                          deleteNote={() => deleteNote(ID)}
                        />])
                        setOpenModal(false);
                      }
                      else {
                        alert("Empty Note");
                      }
                    }
                  }}
                   className='size-60 w-full' ref={inputRef} id="email" />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="password" value="Choose Note Color" />
                  </div>
                  <Select onKeyDown={
                    () => {
                      if (inputRef.current.value && colorRef.current.value) {
                        let ID = uuid();
                        setNotesArr([...NotesArr, <NoteCard
                          key={ID}
                          id={ID}
                          noteTime={{ dayOfMonth, month, year, hour, minutes, seconds }}
                          folderId={folderId}
                          noteContent={inputRef.current.value}
                          bgNoteColor={colorRef.current.value}
                          deleteNote={() => deleteNote(ID)}
                        />])
                        setOpenModal(false);
                      }
                      else {
                        alert("Please insert name");
                      }
                    }
                  } ref={colorRef}>
                    {options}
                  </Select>
                </div>
                <div className="flex justify-between">
                </div>
                <div className="w-full flex justify-center">
                  <Button
                    pill
                    gradientDuoTone="tealToLime"
                    onClick={
                      () => {
                        if (inputRef.current.value && colorRef.current.value) {
                          let ID = uuid();
                          setNotesArr([...NotesArr, <NoteCard
                            key={ID}
                            id={ID}
                            noteTime={{ dayOfMonth, month, year, hour, minutes, seconds }}
                            folderId={folderId}
                            noteContent={inputRef.current.value}
                            bgNoteColor={colorRef.current.value}
                            deleteNote={() => deleteNote(ID)}
                          />])
                          setOpenModal(false);
                        }
                        else {
                          alert("Please insert name");
                        }
                      }
                    }>Add Note</Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div >

        <div className='flex gap-7 flex-wrap justify-around px-5'>
          {NotesArr.filter(note => note.props.folderId === folderId)}
        </div>
        </div>
      </>
      );
}

      export default Notes