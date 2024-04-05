import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import Loading from '../utils/Loading'

const Add = () => {
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const AltitueInputRef = useRef();
    const HSIInputRef = useRef();
    const ADIInputRef = useRef();
    return (
        <>
            <NavBar />
            <div className='flex pt-60 justify-center'>
                {/* <Button gradientDuoTone="purpleToBlue" size={"xl"} onClick={() => setOpenModal(true)}>Add</Button> */}
                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={AltitueInputRef}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Data For Detailes</h3>
                            <div>
                                <div className="mb-2 block text-center">
                                    <Label htmlFor="Altitue" value="Altitue" />
                                </div>
                                <TextInput id="Altitue" ref={AltitueInputRef} placeholder="Add Altitue..." required />
                            </div>
                            <div>
                                <div className="mb-2 block text-center">
                                    <Label htmlFor="HSI" value="HSI" />
                                </div>
                                <TextInput ref={HSIInputRef} id="HSI" required placeholder='Add HSI...' />
                            </div>
                            <div>
                                <div className="mb-2 block text-center">
                                    <Label htmlFor="ADI" value="ADI" />
                                </div>
                                <TextInput ref={ADIInputRef} id="ADI" required placeholder='Add ADI...' />
                            </div>
                            <div className="w-full flex justify-center">
                                <Button onClick={()=>setOpenModal(false)} gradientDuoTone="tealToLime">Add</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
            <Loading on={isLoading}/>
        </>
    )
}

export default Add