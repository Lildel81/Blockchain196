// Installed Packages
import express from 'express';

// Import the User model
import { getVote, submitVote } from '../controllers/Voting.controller.js';

// Create a new router
const router = express.Router();

router.get("/", getVote);

router.post("/", submitVote);

export default router;