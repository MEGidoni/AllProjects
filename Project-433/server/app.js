const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/EmployeeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());

// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Routes
app.use('/employees', employeeRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
