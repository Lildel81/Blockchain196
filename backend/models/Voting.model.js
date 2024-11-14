import mongoose from "mongoose";

const voteSchema = mongoose.Schema({
    voter_id: {
        type: String,
        required: true,
    },
    vote: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

// Create a model from the schema and export it
// Mongoose adds an 's' to the end of the model name to create a collection in the database
const Vote = mongoose.model('Vote', voteSchema);

export default Vote;