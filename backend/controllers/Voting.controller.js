/*
::TODO::
In here, the controller needs to interface with our smart contract
it should call smart contract functions to submit a vote for a candidate, get all
*/

import e from 'express';
import {submitContractVote, getContractVoteCounts, validateVoterAddress} from '../contract.js'

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
            return response.status(400).json({ success: false, message: error.message });
        }

        // Generic error handling
        console.error("Error submitting vote:", error.message);
        response.status(500).json({ success: false, message: "Failed to submit vote to blockchain." });
    }
};



