// app.js

const express = require('express');
const connectDB = require('./db');
const taskRoutes = require('./routes/tasks');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
