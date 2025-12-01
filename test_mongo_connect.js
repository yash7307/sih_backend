const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log("Attempting to connect to MongoDB...");
        const uri = process.env.MONGODB_URI || process.env.MONGO_URL;

        if (!uri) {
            throw new Error("MONGODB_URI or MONGO_URL not found in .env");
        }

        // Mask password in logs
        const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
        console.log(`Using URI: ${maskedUri}`);

        await mongoose.connect(uri);
        console.log("✅ Successfully connected to MongoDB!");
        console.log("Connection State:", mongoose.connection.readyState); // 1 = connected

        // Optional: List collections to be sure
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Available Collections:", collections.map(c => c.name));

        await mongoose.disconnect();
        console.log("Disconnected.");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
    }
}

testConnection();
