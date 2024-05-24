// employeeRoute.js
const express = require('express');
const {
    getAllEmployeesController,
    getEmployeeByIdController,
    addEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
} = require('../controllers/EmployeeController');

const router = express.Router();

// Routes
// Get all employees
router.get('/', getAllEmployeesController);

// Get employee by ID
router.get('/:id', getEmployeeByIdController);

// Add new employee
router.post('/', addEmployeeController);

// Update employee
router.put('/:id', updateEmployeeController);

// Delete employee
router.delete('/:id', deleteEmployeeController);

module.exports = router;
