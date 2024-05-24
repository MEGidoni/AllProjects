import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Label, TextInput, Select } from "flowbite-react";
import Loading from "../components/Loading";
import EmpCard from '../components/EmpCard';
import { fetchEmployees, sortEmployees, addEmployee, updateEmployee, deleteEmployee } from './API';
import { CgArrowsExchangeV } from "react-icons/cg";
import { v4 as uuid } from 'uuid';


const validateInputData = (newEmployee) => {
    if (!newEmployee.name) {
        alert('Please fill in the Name field.');
        return false;
    } else if (newEmployee.name.length < 2) {
        alert('Name must contain at least two letters.');
        return false;
    }
    if (!newEmployee.position) {
        alert('Please fill in the Position field.');
        return false;
    } else if (newEmployee.position.length < 2) {
        alert('Position must contain at least two letters.');
        return false;
    }
    if (!newEmployee.salary) {
        alert('Please fill in the Salary field.');
        return false;
    }
    if (isNaN(newEmployee.salary)) {
        alert('Please enter a valid number for the salary.');
        return false;
    }
    return true;
};

const MainEmp = () => {
    const [load, setLoad] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        position: "",
        salary: "",
        id: ""
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [mes, setMes] = useState('');
    const emailInputRef = useRef();
    const [sortOption, setSortOption] = useState({ criteria: 'name', reverse: false });

    useEffect(() => {
        fetchEmployees(setLoad, setMes, setEmployees, sortOption);
    }, []);

    const handleSortOptionChange = (event) => {
        const value = event.target.value;
        const reverse = sortOption.criteria === value ? !sortOption.reverse : false;
        setSortOption({ criteria: value, reverse });
        sortEmployees({ criteria: value, reverse }, employees,setEmployees);
    };

    const handleReverseSort = () => {
        setSortOption({ ...sortOption, reverse: !sortOption.reverse });
        sortEmployees({ ...sortOption, reverse: !sortOption.reverse }, employees,setEmployees);
    };

    const handleAddEmployee = async () => {
        if (!validateInputData(newEmployee)) {
            return;
        }
        await addEmployee(newEmployee, setNewEmployee, setOpenModal, setLoad, sortOption, employees, setEmployees);
    };

    const handleUpdateEmployee = async () => {
        if (!validateInputData(selectedEmployee)) {
            return;
        }
        await updateEmployee(selectedEmployee, setIsUpdateModalOpen, setLoad, sortOption, employees, setEmployees);
    };

    const handleDeleteEmployee = async (id) => {
        await deleteEmployee(id, setLoad, sortOption, employees, setEmployees);
    };


    return (
        <>
            <Loading on={load} />
            <div className="container mx-auto py-8">
                <div className='flex justify-center mb-10'>
                    <h1 className="text-3xl font-semibold mb-4">Employee Management System</h1>
                </div>
                <div className='flex justify-between p-9'>
                    <Button pill color={"blue"} onClick={() => setOpenModal(true)}><span className='p-1'>Add Employee</span></Button>
                    <div className='flex'>
                        <Select className='me-4' value={sortOption.criteria} onChange={handleSortOptionChange}>
                            <option value="name">Sort by Name</option>
                            <option value="position">Sort by Position</option>
                            <option value="salary">Sort by Salary</option>
                            <option value="id">Sort by ID</option>
                        </Select>
                        <Button color={''} pill onClick={handleReverseSort}><CgArrowsExchangeV color='black' size={25} /></Button>
                    </div>
                </div>
                <div className='text-center p-4 font-bold text-3xl text-red-700 mt-5'><h2>{mes}</h2></div>
                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Name" />
                                </div>
                                <TextInput
                                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                    className="mb-4"
                                    placeholder="name" id="email" ref={emailInputRef} required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Position" />
                                </div>
                                <TextInput
                                    onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                                    className="mb-4"
                                    placeholder="position"
                                    id="password" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password" value="Salary" />
                                </div>
                                <TextInput
                                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value, id: uuid() })}
                                    placeholder="salary"
                                    id="password" required />
                            </div>
                            <div className="w-full flex justify-between">
                                <Button
                                    className='p-1'
                                    onClick={() => {
                                        handleAddEmployee();
                                        setOpenModal(false);
                                    }}
                                    pill color={"blue"}>Add Employee</Button>
                                <Button
                                    onClick={() => {
                                        setOpenModal(false);
                                    }}
                                    color="">Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <div className="grid grid-cols-1 gap-4 mt-8 p-2">
                    {employees.map(employee => {
                        return (
                            <EmpCard key={employee.id} id={employee.id} name={employee.name} position={employee.position} salary={employee.salary} onDeleteClick={() => handleDeleteEmployee(employee._id)} onUpdateClick={() => {
                                setSelectedEmployee(employee);
                                setIsUpdateModalOpen(true);
                            }} />
                        );
                    })}
                </div>
                <Modal show={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} initialFocus>
                    <Modal.Header>Update Employee</Modal.Header>
                    <Modal.Body>
                        <TextInput label="ID" value={selectedEmployee ? `ID:${selectedEmployee.id}` : ''} disabled className="mb-4" />
                        <TextInput label="Name" value={selectedEmployee ? selectedEmployee.name : ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })} className="mb-4" />
                        <TextInput label="Position" value={selectedEmployee ? selectedEmployee.position : ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, position: e.target.value })} className="mb-4" />
                        <TextInput type="number" label="Salary" value={selectedEmployee ? selectedEmployee.salary : ''} onChange={e => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='p-1' onClick={handleUpdateEmployee} pill color={"blue"}>Update</Button>
                        <Button onClick={() => setIsUpdateModalOpen(false)} color={""}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default MainEmp


