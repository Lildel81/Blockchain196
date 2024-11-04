import User from '../models/User.model.js';
import mongoose from 'mongoose';

// Get all Users from the database
export const getUser = async (request, response) => {
    try {
        const user = await User.find({});
        response.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error fetching users from database." });
    }
}

// Create a new User in the database
export const createUser = async (request, response) => {
    // User sends us a user to add to the database
    const user = request.body;

    // Validate the user
    if (!user.fname || !user.lname || !user.username || !user.email || !user.password) {
        response.status(400).send({ message: "User is missing required fields." });
    }

    // Add the user to the database
    const newUser = new User(user);

    // Save the user to the database
    try {
        await newUser.save();
        response.status(201).json({ success: true, data: newUser });
    } catch (error) {
        // If there is an error saving the user to the database
        console.log(error);
        response.status(500).json({ success: false, message: "Error saving user to database." });
    }
}

// Update a User by id in the database
export const updateUser = async (request, response) => {
    // Get the id of the user to update
    const {id} = request.params;
    // Get the new data for the user
    const user = request.body;

    // Check if the provided user data is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "user not found." });
    }

    // Attempt to update the user
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true }); // use findByIdAndUpdate method to update the user (Mongoose method)
        response.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.log(error);
        response.status(400).json({ success: false, message: "Internal server error." });
    }
}

// Delete a User by id from the database
export const deleteUser = async (request, response) => {
    // Get the id of the user to delete
    const {id} = request.params;
    // Log the id to the console
    console.log("Deleting user with id:", id);

    // Check if the provided user data is valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ success: false, message: "User not found." });
    }

    // Attempt to delete the user
    try {
        await User.findByIdAndDelete(id); // use findByIdAndDelete method to delete the user (Mongoose method)
        response.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Internal server error." });
    }

}