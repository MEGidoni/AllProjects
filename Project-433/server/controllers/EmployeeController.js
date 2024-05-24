const {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
} = require('../services/EmployeeService');

// Get all employees
async function getAllEmployeesController(req, res) {
    try {
        const allEmployees = await getAllEmployees();
        res.status(200).json(allEmployees);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get employee by ID
async function getEmployeeByIdController(req, res) {
    const { id } = req.params;
    try {
        const employee = await getEmployeeById(id);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error finding employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Add new employee
async function addEmployeeController(req, res) {
    const employeeData = req.body;
    try {
        const newEmployee = await addEmployee(employeeData);
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error adding employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update employee
async function updateEmployeeController(req, res) {
    const { id } = req.params;
    const newData = req.body;
    try {
        const updatedEmployee = await updateEmployee(id, newData);
        if (updatedEmployee) {
            res.status(200).json(updatedEmployee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error) {
        console.error('Error updating employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete employee
async function deleteEmployeeController(req, res) {
    const { id } = req.params;
    try {
        await deleteEmployee(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllEmployeesController,
    getEmployeeByIdController,
    addEmployeeController,
    updateEmployeeController,
    deleteEmployeeController
};
