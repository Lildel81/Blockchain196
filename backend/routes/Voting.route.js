// Installed Packages
import express from 'express';

// Import the controller functions
import { 
    getVote, 
    submitVote, 
    startElectionController, 
    endElectionController, 
    getElectionStatusController, 
    getElectionResultsController 
} from '../controllers/Voting.controller.js';

// Create a new router
const router = express.Router();

// Existing routes
router.get("/", getVote);
router.post("/", submitVote);

// New routes for election management
router.post("/start", startElectionController);
router.post("/end", endElectionController);
router.get("/status", getElectionStatusController);
router.get("/results", getElectionResultsController);

export default router;
