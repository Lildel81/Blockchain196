import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import votingRoutes from './routes/Voting.route.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Allows us to accept JSON data in the body of the request
app.use(express.json());

// import the voting api
app.use('/voting/', votingRoutes);

// Start server on port 5000
app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});