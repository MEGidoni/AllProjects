import axios from 'axios';

const linkToServer = 'https://four33sever-1.onrender.com/employees/';

export const fetchEmployees = async (setLoad, setMes, setEmployees, sortOption) => {
    try {
        setLoad(true);
        const response = await axios.get(linkToServer);
        sortEmployees({ criteria: sortOption.criteria, reverse: sortOption.reverse }, response.data, setEmployees);
        setLoad(false);
        setMes("Employees:");
    } catch (error) {
        if (error.message === 'Network Error') {
            setMes("Server Down!");
        }
        console.error('Error fetching employees:', error);
        setLoad(false);
    }
};

export const sortEmployees = (option, data, setEmployees) => {
    const sortedData = [...data].sort((a, b) => {
        if (option.criteria === 'name' || option.criteria === 'position') {
            return option.reverse ? b[option.criteria].localeCompare(a[option.criteria]) : a[option.criteria].localeCompare(b[option.criteria]);
        } else if (option.criteria === 'salary') {
            return option.reverse ? b[option.criteria] - a[option.criteria] : a[option.criteria] - b[option.criteria];
        } else {
            return option.reverse ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
        }
    });
    setEmployees(sortedData);
};

export const addEmployee = async (newEmployee, setNewEmployee, setOpenModal, setLoad, sortOption, employees, setEmployees) => {
    try {
        if (!validateInputData(newEmployee)) {
            return;
        }
        setLoad(true);
        const response = await axios.post(linkToServer, newEmployee);
        sortEmployees(sortOption, [...employees, response.data],setEmployees);
        setNewEmployee({ id: '', name: '', position: '', salary: '' });
        setLoad(false);
        setOpenModal(false);

    } catch (error) {
        console.error('Error adding employee:', error);
        setLoad(false);
    }
};

export const updateEmployee = async (selectedEmployee, setIsUpdateModalOpen, setLoad, sortOption, employees, setEmployees) => {
    try {
        if (!validateInputData(selectedEmployee)) {
            return;
        }
        setLoad(true);
        await axios.put(`${linkToServer}${selectedEmployee._id}`, selectedEmployee);
        sortEmployees(sortOption, employees.map(emp => (emp._id === selectedEmployee._id ? selectedEmployee : emp)),setEmployees);
        setIsUpdateModalOpen(false);
        setLoad(false);
    } catch (error) {
        console.error('Error updating employee:', error);
        setLoad(false);
    }
};

export const deleteEmployee = async (id, setLoad, sortOption, employees,setEmployees) => {
    try {
        setLoad(true);
        await axios.delete(`${linkToServer}${id}`);
        sortEmployees(sortOption, employees.filter(emp => emp._id !== id),setEmployees);
        setLoad(false);
    } catch (error) {
        console.error('Error deleting employee:', error);
        setLoad(false);
    }
};


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