import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('URI:', process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Add connection options here if needed
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Full error details:', error);
        process.exit(1); // 1 means exit with failure, 0 means exit without failure
    }
}