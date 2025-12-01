const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

async function verifyUser() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL);
        console.log("Connected.");

        const user = await User.findOne({ email: 'finaltest@test.com' }).sort({ createdAt: -1 });

        if (user) {
            console.log("✅ User found in DB:");
            console.log("Name:", user.fullname);
            console.log("Email:", user.email);
            console.log("Created At:", user.createdAt);
        } else {
            console.log("❌ User 'finaltest@test.com' NOT found in DB.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

verifyUser();
