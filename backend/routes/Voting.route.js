// Installed Packages
import express from 'express';

// Import the User model
import { getVote, submitVote, registerVoter } from '../controllers/Voting.controller.js';

// Create a new router
const router = express.Router();

router.get("/", getVote);

router.post("/", submitVote);

router.post("/register-voter", registerVoter);

export default router;