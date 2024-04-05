import { Button, Label, Modal, Select, TextInput } from 'flowbite-react';
import { useContext, useEffect, useRef, useState } from 'react';
import React from 'react'
import CardFolder from './CardFolder';
import { v4 as uuid, validate } from "uuid";
import NavBar from './NavBar';
import foldersArr from '../context/foldersArr';
import notesArr from '../context/notesArr';
import NoteCard from './NoteCard';




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
    .map(color => <option style={{background:color.hex}} key={color.name} value={color.hex}> {color.name} </option> )

const Folders = () => {

    console.log("entered Folders");

    let currentDate = new Date();
    let dayOfMonth = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    const [openModal, setOpenModal] = useState(false);
    const { folders, setFolders } = useContext(foldersArr);
    const { NotesArr, setNotesArr } = useContext(notesArr)
    const inputRef = useRef(null);
    const colorRef = useRef(null);


    const deleteFolder = (id) => {
        setFolders((prev) => prev.filter(folder => folder.props.id !== id));
        setNotesArr((prev) => prev.filter(note => note.props.folderId !== id));
    };

    useEffect(() => {

        const storedFolders = JSON.parse(localStorage.getItem('folders'));
        if (storedFolders) {
            const parsedFolders = storedFolders.map((folder) => (
                <CardFolder
                    key={folder.id}
                    id={folder.id}
                    time={folder.time}
                    folderName={folder.folderName}
                    bgColor={folder.bgColor}
                    deleteFolder={() => deleteFolder(folder.id)}
                />
            ));
            setFolders(parsedFolders);
        }

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

        const serializedFolders = folders.map((folder) => ({
            id: folder.props.id,
            time: folder.props.time,
            folderName: folder.props.folderName,
            bgColor: folder.props.bgColor,
        }));

        localStorage.setItem('folders', JSON.stringify(serializedFolders));

    }, [folders]);

    useEffect(() => {
        const serializedNotes = NotesArr.map((note) => {
            const folderExists = folders.some(folder => folder.props.id === note.props.folderId);
            if (folderExists) {
                return {
                    id: note.props.id,
                    folderId: note.props.folderId,
                    noteTime: note.props.noteTime,
                    noteContent: note.props.noteContent,
                    bgNoteColor: note.props.bgNoteColor,
                };
            }
            else {
                return {
                    id: note.props.id,
                    folderId: null,
                    noteTime: note.props.noteTime,
                    noteContent: note.props.noteContent,
                    bgNoteColor: note.props.bgNoteColor
                };
            }
        });
        localStorage.setItem('notes', JSON.stringify(serializedNotes));
    }, [folders, NotesArr]);


    return (
        <>
            <div style={{ backgroundImage: "url('https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')", minHeight: "641px", backgroundSize: 'cover', backgroundPosition: 'bottom', justifyItems: "center", backgroundAttachment: 'fixed' }}>
                {/* <NavBar /> */}
                <br />
                <br />
                <div className='flex justify-center mb-20'><h2 className='text-5xl text-green-400 font-mono'><span className='text-5xl text-red-400 font-mono underline'>Folders</span></h2></div>
                <div className='flex justify-center items-center mb-10'>
                    <Button pill gradientMonochrome="cyan" onClick={() => setOpenModal(true)}>Add Folder</Button>
                    <Modal initialFocus={inputRef} show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Folder Name" />
                                    </div>
                                    <TextInput onKeyDown={(e) => {
                                        if (e.key == "Enter") {
                                            if (inputRef.current.value && colorRef.current.value) {
                                                let ID = uuid();
                                                setFolders([...folders, <CardFolder
                                                    key={ID}
                                                    id={ID}
                                                    time={{ dayOfMonth, month, year, hour, minutes, seconds }}
                                                    folderName={inputRef.current.value}
                                                    bgColor={colorRef.current.value}
                                                    deleteFolder={() => deleteFolder(ID)}
                                                />])
                                                setOpenModal(false);
                                            }
                                            else {
                                                alert("Please insert name");
                                            }
                                        }
                                    }} ref={inputRef} id="email" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="password" value="Choose Folder Color" />
                                    </div>
                                    <Select onKeyDown={
                                        () => {
                                            if (inputRef.current.value && colorRef.current.value) {
                                                let ID = uuid();
                                                setFolders([...folders, <CardFolder
                                                    key={ID}
                                                    id={ID}
                                                    time={{ dayOfMonth, month, year, hour, minutes, seconds }}
                                                    folderName={inputRef.current.value}
                                                    bgColor={colorRef.current.value}
                                                    deleteFolder={() => deleteFolder(ID)}
                                                />])
                                                setOpenModal(false);
                                            }
                                            else {
                                                alert("Please insert color");
                                            }
                                        }
                                    }
                                     ref={colorRef}
                                     >
                                        {options}
                                    </Select>
                                </div>
                                <div className="flex justify-between">
                                </div>
                                <div className="w-full flex justify-center">
                                    <Button
                                        pill
                                        gradientDuoTone="purpleToPink"
                                        onClick={
                                            () => {
                                                if (inputRef.current.value && colorRef.current.value) {
                                                    let ID = uuid();
                                                    setFolders([...folders, <CardFolder
                                                        key={ID}
                                                        id={ID}
                                                        time={{ dayOfMonth, month, year, hour, minutes, seconds }}
                                                        folderName={inputRef.current.value}
                                                        bgColor={colorRef.current.value}
                                                        deleteFolder={() => deleteFolder(ID)}
                                                    />])
                                                    setOpenModal(false);
                                                }
                                                else {
                                                    alert("Please insert name");
                                                }
                                            }
                                        }>Add Folder</Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div >

                <div className='flex gap-7 flex-wrap justify-around px-5'>
                    {folders}
                </div>
            </div>
        </>
    );
}

export default Folders