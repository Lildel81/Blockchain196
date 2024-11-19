import Vote from '../models/Vote.model.js';
import { submitVote, getVoteCounts } from '../utils/contract.js'; // Adjust the path to contract.js as needed

// Get vote totals from the smart contract
export const getVoteController = async (request, response) => {
    try {
        const counts = await getVoteCounts(); // Use the imported function
        response.status(200).json({ success: true, data: counts });
    } catch (error) {
        console.error("Error fetching vote counts:", error);
        response.status(500).json({ success: false, message: "Error fetching vote counts." });
    }
};

// Submit a vote to the smart contract
export const submitVoteController = async (request, response) => {
    const { voter_id, vote } = request.body;

    // Validate the vote
    if (!voter_id || !vote) {
        return response.status(400).send({ message: "Vote is missing required fields." });
    }

    try {
        // Replace with a valid address from Ganache or get from request
        const voterAddress = "0xYourVoterAddress"; // Update this dynamically if needed

        // Submit the vote via the imported function
        await submitVote(voterAddress, vote);

        // Optionally save the vote in your database
        const newVote = new Vote({ voter_id, vote });
        await newVote.save();

        response.status(200).json({ success: true, message: "Vote submitted successfully." });
    } catch (error) {
        console.error("Error submitting vote:", error);
        response.status(500).json({ success: false, message: "Error submitting vote." });
    }
};
