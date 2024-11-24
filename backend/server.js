import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import votingRoutes from './routes/Voting.route.js';

// Load env variables from .env file
dotenv.config();

// Create express app
const app = express();

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's URL and port
    methods: ['GET', 'POST'],       // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Allows us to accept JSON data in the body of the request
app.use(express.json());

// Import the voting API
app.use('/voting/', votingRoutes);

// Start server on port 5000
app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
