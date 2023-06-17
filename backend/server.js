const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
// Import Mongoos Connection
const connectDB = require('./config/database');

connectDB()
// Middleware
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
