// employee.model.js
const mongoose = require('../db');

const employeeSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
