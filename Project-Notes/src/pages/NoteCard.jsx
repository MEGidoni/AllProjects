import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Button, Modal, Textarea } from 'flowbite-react';
import { TiDelete } from "react-icons/ti";
import { useLocation, useNavigate } from 'react-router-dom';
import notesArr from '../context/notesArr';
import foldersArr from '../context/foldersArr';
import toast from '../context/toast';
import CardFolder from './CardFolder';
import MoveNote from '../components/MoveNote';

const options = [
    { name: "PaleSkyBlue", hex: "#add8e6" },
    { name: "Peach", hex: "#ffdab9" },
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
    { name: "SoftGray", hex: "#778899" },
    { name: "LightBlue", hex: "#e0ffff" },
    { name: "SoftLilac", hex: "#e6e6fa" }
  ]
  

const NoteCard = ({ noteContent, bgNoteColor, deleteNote, folderId, noteTime }) => {

    console.log("entered noteCard");

    const [openModal, setOpenModal] = useState(false);
    const { setOpentoast, setDest } = useContext(toast)
    const { NotesArr, setNotesArr } = useContext(notesArr);
    const { folders, setFolders } = useContext(foldersArr);
    const selectRef = useRef();
    const updateNoteRef = useRef();
    const changeColor = useRef();

    const takeFirstTwoWords = (sentence) => {

        const noteWords = sentence.trim().split(/\s+/);

        if (noteWords.length >= 2) {
            const min_sentence = noteWords.slice(0, 2).join(" ");
            return min_sentence.substring(0, 15) + "..."
        }

        else {
            const min_sentence = sentence.substring(0, 15);
            return min_sentence + "...";
        }
    }

    const updateNote = (newfolderId, newContent, newBgNoteColor) => {


        const updatedNotesArr = NotesArr.map(note => {

            if (JSON.stringify(note.props.noteTime) == JSON.stringify(noteTime)) {
                return {
                    id: note.props.id,
                    folderId: newfolderId ? newfolderId : note.props.folderId,
                    noteTime: note.props.noteTime,
                    noteContent: newContent ? newContent : note.props.noteContent,
                    bgNoteColor: newBgNoteColor ? newBgNoteColor : note.props.bgNoteColor
                };
            }
            else{
                return {
                    id: note.props.id,
                    folderId: note.props.folderId,
                    noteTime: note.props.noteTime,
                    noteContent: note.props.noteContent,
                    bgNoteColor: note.props.bgNoteColor
                };
            }
        });
        localStorage.setItem('notes', JSON.stringify(updatedNotesArr));

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



    return (

        <>
            <div className='min-w-[333px]'>

                <Card className="max-w-sm m-4" style={{ background: `${bgNoteColor ? bgNoteColor : "gray"}` }}>

                    <div className='flex justify-between'>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {takeFirstTwoWords(noteContent) ? takeFirstTwoWords(noteContent) : "NO NAME"}
                        </h5>
                        <TiDelete size={31} cursor={"pointer"} onClick={deleteNote} />
                    </div>
                    {
                        noteTime &&
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {`${noteTime.hour > 9 ? noteTime.hour : '0' + noteTime.hour}:${noteTime.minutes > 9 ? noteTime.minutes : '0' + noteTime.minutes}:${noteTime.seconds > 9 ? noteTime.seconds : '0' + noteTime.seconds} , ${noteTime.dayOfMonth}/${noteTime.month}/${noteTime.year} `}
                        </p>
                    }
                    <Button gradientMonochrome="lime" onClick={() => setOpenModal(true)}>Enter Note</Button>
                    <Modal initialFocus={updateNoteRef} dismissible show={openModal} onClose={() => setOpenModal(false)}>
                        <Modal.Header>
                            {takeFirstTwoWords(noteContent)}
                        </Modal.Header>
                        <Modal.Body>
                            <div className="space-y-6">
                                <Textarea
                                 onKeyDown={(e) => {
                                    if (e.key == 'Shift') {
                                        setOpenModal(false);
                                        updateNote(
                                            selectRef.current.value !== 'Change Folder' ? selectRef.current.value : undefined,
                                            updateNoteRef.current.value !== noteContent ? updateNoteRef.current.value : undefined,
                                            changeColor.current.value !== 'Change Color' ? changeColor.current.value : undefined
                                        )
                                        if (selectRef.current.value !== 'Change Folder' || updateNoteRef.current.value !== noteContent || changeColor.current.value !== 'Change Color') {
                                            setOpentoast(true);
                                            setDest("Note Updates Saved");
                                        }
                                    }
                                }}
                                 className='size-40 w-full' ref={updateNoteRef} defaultValue={noteContent} />
                            </div>
                        </Modal.Body>
                        <Modal.Footer
                            className='flex justify-between'
                        >
                            <div className='flex'>
                                <Button
                                gradientDuoTone="greenToBlue"
                                    className='me-3'
                                    onClick={() => {
                                        setOpenModal(false);
                                        updateNote(
                                            selectRef.current.value !== 'Change Folder' ? selectRef.current.value : undefined,
                                            updateNoteRef.current.value !== noteContent ? updateNoteRef.current.value : undefined,
                                            changeColor.current.value !== 'Change Color' ? changeColor.current.value : undefined
                                        )
                                        if (selectRef.current.value !== 'Change Folder' || updateNoteRef.current.value !== noteContent || changeColor.current.value !== 'Change Color') {
                                            setOpentoast(true);
                                            setDest("Note Updates Saved");
                                        }
                                    }}>Save Changes</Button>
                                <select onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        setOpenModal(false);
                                        updateNote(
                                            selectRef.current.value !== 'Change Folder' ? selectRef.current.value : undefined,
                                            updateNoteRef.current.value !== noteContent ? updateNoteRef.current.value : undefined,
                                            changeColor.current.value !== 'Change Color' ? changeColor.current.value : undefined
                                        )
                                        if (selectRef.current.value !== 'Change Folder' || updateNoteRef.current.value !== noteContent || changeColor.current.value !== 'Change Color') {
                                            setOpentoast(true);
                                            setDest("Note Updates Saved");
                                        }
                                    }
                                }} ref={selectRef} className='me-2 rounded-xl' id="countries">

                                    <option key={"Change Folder"}>Change Folder</option>
                                    {folders
                                        .filter(folder => folder.props.id !== folderId)
                                        .map(folder => <option
                                            style={{background:folder.props.bgColor}}
                                            data-info={folder.props.folderName}
                                            key={folder.props.folderName}
                                            value={folder.props.id}>
                                            {folder.props.folderName}
                                        </option>)}
                                </select>
                                <select onKeyDown={(e) => {
                                    if (e.key == 'Enter') {
                                        setOpenModal(false);
                                        updateNote(
                                            selectRef.current.value !== 'Change Folder' ? selectRef.current.value : undefined,
                                            updateNoteRef.current.value !== noteContent ? updateNoteRef.current.value : undefined,
                                            changeColor.current.value !== 'Change Color' ? changeColor.current.value : undefined
                                        )
                                        if (selectRef.current.value !== 'Change Folder' || updateNoteRef.current.value !== noteContent || changeColor.current.value !== 'Change Color') {
                                            setOpentoast(true);
                                            setDest("Note Updates Saved");
                                        }
                                    }
                                }} 
                                ref={changeColor} className='me-2 rounded-xl' id="countries">
                                    <option onKeyDown={(e) => {
                                        if (e.key == 'Enter') {
                                            setOpenModal(false);
                                            updateNote(
                                                selectRef.current.value !== 'Change Folder' ? selectRef.current.value : undefined,
                                                updateNoteRef.current.value !== noteContent ? updateNoteRef.current.value : undefined,
                                                changeColor.current.value !== 'Change Color' ? changeColor.current.value : undefined
                                            )
                                            if (selectRef.current.value !== 'Change Folder' || updateNoteRef.current.value !== noteContent || changeColor.current.value !== 'Change Color') {
                                                setOpentoast(true);
                                                setDest("Note Updates Saved");
                                            }
                                        }
                                    }} key={"Change Color"}>Change Color</option>
                                    {options
                                        .filter(option => option.hex !== bgNoteColor)
                                        .map(option => <option style={{background:option.hex}} key={option.name} value={option.hex} >{option.name}</option>)
                                    }
                                </select>
                            </div>
                            <div><Button color="failure" onClick={() => setOpenModal(false)}>Cancel</Button></div>
                        </Modal.Footer>
                    </Modal>

                </Card>
            </div>
        </>
    );
}

export default NoteCard