import Vote from '../models/Vote.model.js';
import mongoose from 'mongoose';

// Get all Users from the database
export const getVote = async (request, response) => {
    try {
        const vote = await Vote.find({});
        response.status(200).json({ success: true, data: vote });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error fetching vote." });
    }
}

// Create a new User in the database
export const submitVote = async (request, response) => {
    // User sends us a user to add to the database
    const vote = request.body;

    // Validate the vote
    if (!vote.voter_id || !vote.vote) {
        response.status(400).send({ message: "Vote is missing required fields." });
    }
}
