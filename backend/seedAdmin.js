import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const makeAdmin = async () => {
    try {
        await connectDB();

        const email = process.argv[2];

        if (!email) {
            console.log('Please provide an email address as an argument.');
            console.log('Usage: node seedAdmin.js <email>');
            process.exit(1);
        }

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = 'admin';
        await user.save();

        console.log(`User ${user.name} (${user.email}) is now an Admin.`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

makeAdmin();
