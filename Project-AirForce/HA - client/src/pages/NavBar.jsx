import React, { useContext, useRef, useState } from 'react'
import styles from '../assets/nav.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Loading from '../utils/Loading'
import axios from "axios";
import INFOCONTEXT from '../hooks/infoContext';

const NavBar = () => {

    const { info, setInfo } = useContext(INFOCONTEXT);
    const nav = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const AltitueInputRef = useRef();
    const HSIInputRef = useRef();
    const ADIInputRef = useRef();

    const checkingData = (a, b, c) => {
        if (!a || !b || !c) {
            alert("Missing value!");
            return false;
        }
        else if (a < 0 || b < 0 || c < 0) {
            alert("the value must be greater or equal to zero!");
            return false;
        }
        else if (a > 3000) {
            alert("the Altitue value must be smaller or equal to 3000!");
            return false;
        }
        else if (b > 360) {
            alert("the HSI value must be smaller or equal to 360!");
            return false;
        }
        else if (c > 100) {
            alert("the ADI value must be smaller or equal to 100!");
            return false;
        }
        return true;
    }

    const addData = async () => {
        const a = AltitueInputRef.current.value;
        const b = HSIInputRef.current.value;
        const c = ADIInputRef.current.value;
        if (checkingData(a, b, c)) {
            try {
                setLoading(true);
                const data = await axios.post('https://ha-server.onrender.com/data', {
                    "Altitude": a,
                    "HIS": b,
                    "ADI": c
                });
                setInfo(data.data);
                setLoading(false);
                nav("/visual");
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
    };
    return (
        <>
            <header className='mb-1'>
                <nav className='bg-slate-500 h-[50px] text-center p-10 flex items-center justify-center'>
                    <div>
                        <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/'}>Detailed</NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.active : styles.not_active} to={'/visual'}>Visual</NavLink>
                    </div>
                    <Button pill className='me-6' gradientDuoTone="purpleToBlue" size={"md"} onClick={() => setOpenModal(true)}>Add</Button>
                </nav>
            </header>




            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={AltitueInputRef}>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">Add Data For Detailes</h3>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="Altitue" value="Altitue" />
                            </div>
                            <TextInput type='number' id="Altitue" ref={AltitueInputRef} placeholder="Add Altitue... (0-3000)" required />
                        </div>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="HSI" value="HSI" />
                            </div>
                            <TextInput type='number' ref={HSIInputRef} id="HSI" required placeholder='Add HIS... (0-360)' />
                        </div>
                        <div>
                            <div className="mb-2 block text-center">
                                <Label htmlFor="ADI" value="ADI" />
                            </div>
                            <TextInput type='number' ref={ADIInputRef} id="ADI" required placeholder='Add ADI... (0-100)' />
                        </div>
                        <div className="w-full flex justify-center">
                            <Button type='submit' pill onClick={() => {
                                addData();
                                setOpenModal(false);
                            }} gradientDuoTone="tealToLime">Add</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <Loading on={isLoading} />

        </>
    )
}

export default NavBar