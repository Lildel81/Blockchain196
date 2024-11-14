import Vote from '../models/Vote.model.js';
import mongoose from 'mongoose';

/*
::TODO::
In here, the controller needs to interface with our smart contract
it should call smart contract functions to submit a vote for a candidate, get all
*/

// Get vote totals
export const getVote = async (request, response) => {
    try {
        // Web3 method for calling getVoteCount function:
        //const voteCount = await votingContract.methods.GetCount().call();
        response.status(200).json({ success: true, data: voteCount });
    } catch (error) {
        console.error("Error fetching vote count:", error);
        response.status(500).json({ success: false, message: "Error fetching vote count from blockchain." });
    }
};


// Submit a vote from a voter_id
export const submitVote = async (request, response) => {
    const { voter_id, vote } = request.body;

    // Validate the vote
    if (!voter_id || !vote) {
        return response.status(400).send({ message: "Vote is missing required fields." });
    }

    try {
        //const transaction = await votingContract.methods.Vote(vote).send({
        //    from: voter_id,  // Address of the voter
        //    gas: 3000000     // Set an appropriate gas limit
        //});

        console.log("Vote transaction:", transaction);
        response.status(200).json({ success: true, data: transaction });
    } catch (error) {
        console.error("Error submitting vote:", error);
        response.status(500).json({ success: false, message: "Failed to submit vote to blockchain." });
    }
};

