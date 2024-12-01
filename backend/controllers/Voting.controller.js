/*
::TODO::
In here, the controller needs to interface with our smart contract
it should call smart contract functions to submit a vote for a candidate, get all
*/

import e from 'express';
import { startElection, 
    endElection, 
    getElectionStatus, 
    getElectionResults, 
    submitContractVote, 
    getContractVoteCounts, 
    validateVoterAddress } from '../contract.js'

// Get vote totals
export const getVote = async (request, response) => {
    try {
        const data = await getContractVoteCounts()
        // cannot serialize bigint, need to convert to number then send back
        const formattedData = {
            redVotes: Number(data.redVotes), // or data.redVotes.toString() for string
            blueVotes: Number(data.blueVotes), // or data.blueVotes.toString()
        };
        response.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        console.error("Error fetching vote count:", error);
        response.status(500).json({ success: false, message: "Error fetching vote count from blockchain." });
    }
};

// Start the election
export const startElectionController = async (request, response) => {
    try {
        const result = await startElection();
        response.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error("Error starting election:", error.message);
        response.status(500).json({ success: false, message: "Failed to start election." });
    }
};

// End the election
export const endElectionController = async (request, response) => {
    try {
        const result = await endElection();
        response.status(200).json({ success: true, message: result });
    } catch (error) {
        console.error("Error ending election:", error.message);
        response.status(500).json({ success: false, message: "Failed to end election." });
    }
};


// Submit a vote from a wallet address
export const submitVote = async (request, response) => {
    const { address, vote } = request.body;

    // Validate the request
    if (!address || !vote) {
        return response.status(400).json({ message: "Vote is missing required fields." });
    }

    try {
        // Validate the voter address
        const isValid = await validateVoterAddress(address);
        if (!isValid) {
            return response.status(400).json({ success: false, message: "Invalid voter address." });
        }

        // Submit the vote
        const result = await submitContractVote(address, vote);
        response.status(200).json({ success: true, data: result });
    } catch (error) {
        // Handle "already voted" error
        if (error.message === "Address has already voted") {
            return response.status(400).json({ success: false, message: "You have already voted!" });
        }

        // Generic error handling
        console.error("Error submitting vote:", error.message);
        response.status(500).json({ success: false, message: "Failed to submit vote to blockchain." });
    }
};

// Get election status
export const getElectionStatusController = async (request, response) => {
    try {
        const status = await getElectionStatus();
        response.status(200).json({ success: true, data: status });
    } catch (error) {
        console.error("Error fetching election status:", error.message);
        response.status(500).json({ success: false, message: "Failed to fetch election status." });
    }
};

// Get election results
export const getElectionResultsController = async (request, response) => {
    try {
        const results = await getElectionResults();
        const formattedData = {
            redVotes: Number(results.redVotes),
            blueVotes: Number(results.blueVotes),
        };
        response.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        console.error("Error fetching election results:", error.message);
        response.status(500).json({ success: false, message: "Failed to fetch election results." });
    }
};



