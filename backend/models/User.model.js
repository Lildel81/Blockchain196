import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

// Create a model from the schema and export it
// Mongoose adds an 's' to the end of the model name to create a collection in the database
const User = mongoose.model('User', userSchema);

export default User;