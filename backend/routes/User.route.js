// Installed Packages
import express from 'express';

// Import the User model
import { getUser, createUser, updateUser, deleteUser } from '../controllers/User.controller.js';

// Create a new router
const router = express.Router();

router.get("/", getUser);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;