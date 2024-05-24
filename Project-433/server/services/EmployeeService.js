// services.js
const Employee = require('../models/EmployeeModel');

// Function to get all employees
async function getAllEmployees() {
    try {
        return await Employee.find({});
    } catch (err) {
        throw new Error('Error fetching employees');
    }
}

// Function to get employee by ID
async function getEmployeeById(id) {
    try {
        return await Employee.findById(id);
    } catch (err) {
        throw new Error('Error finding employee');
    }
}

// Function to add new employee
async function addEmployee(employeeData) {
    try {
        const newEmployee = new Employee(employeeData);
        return await newEmployee.save();
    } catch (err) {
        throw new Error('Error adding employee');
    }
}

// Function to update employee
async function updateEmployee(id, newData) {
    try {
        return await Employee.findByIdAndUpdate(id, newData, { new: true });
    } catch (err) {
        throw new Error('Error updating employee');
    }
}

// Function to delete employee
async function deleteEmployee(id) {
    try {
        return await Employee.findByIdAndDelete(id);
    } catch (err) {
        throw new Error('Error deleting employee');
    }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
};
