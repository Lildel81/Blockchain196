/*
::TODO::
In here, the controller needs to interface with our smart contract
it should call smart contract functions to submit a vote for a candidate, get all
*/

import e from 'express';
import {submitContractVote, getContractVoteCounts} from '../contract.js'

// Get vote totals
export const getVote = async (request, response) => {
    try {
        const data = await getContractVoteCounts()
        // cannot serialize bigint, need to convert to number then send back
        const formattedData = {
            redVotes: Number(data.redVotes), // or data.redVotes.toString() for string
            blueVotes: Number(data.blueVotes), // or data.blueVotes.toString()
        };

        console.log("Got vote!")
        response.status(200).json({ success: true, data: formattedData });
    } catch (error) {
        console.error("Error fetching vote count:", error);
        response.status(500).json({ success: false, message: "Error fetching vote count from blockchain." });
    }
};


// Submit a vote from a wallet address
export const submitVote = async (request, response) => {
    const { address, vote } = request.body;
    // Validate the vote
    if (!address || !vote) {
        return response.status(400).send({ message: "Vote is missing required fields." });
    }
    try {
        // We get a result with the vote (success/failure on the contract)
        const result = submitContractVote(address, vote);
        response.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("Error submitting vote:", error);
        response.status(500).json({ success: false, message: "Failed to submit vote to blockchain." });
    }
}


