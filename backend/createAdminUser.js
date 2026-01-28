import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

console.log('Loading environment variables...');
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Not Loaded');

const createAdminUser = async () => {
    try {
        await connectDB();

        const email = 'admin@resume.com';
        const password = 'admin123';
        const name = 'Admin User';

        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exists. Updating role and password...');
            user.role = 'admin';
            user.password = password; // Will be hashed by pre-save hook
            await user.save();
            console.log('Admin user updated successfully.');
        } else {
            console.log('Creating new admin user...');
            user = await User.create({
                name,
                email,
                password,
                role: 'admin'
            });
            console.log('Admin user created successfully.');
        }

        console.log(`\ncredentials:\nEmail: ${email}\nPassword: ${password}`);
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
