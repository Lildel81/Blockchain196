import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/User.route.js';
import votingRoutes from './routes/Voting.route.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Allows us to accept JSON data in the body of the request
app.use(express.json());

// Import the auth api
app.use('/auth/', authRoutes);
app.use('/voting/', votingRoutes);

// Start server on port 5000
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});