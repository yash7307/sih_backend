require('dotenv').config();

console.log("Environment Variables Check:");
console.log("============================");
console.log("CLOUD_NAME:", process.env.CLOUD_NAME ? "✅ Set" : "❌ Missing");
console.log("CLOUD_API_KEY:", process.env.CLOUD_API_KEY ? "✅ Set" : "❌ Missing");
console.log("CLOUD_API_SECRET:", process.env.CLOUD_API_SECRET ? "✅ Set" : "❌ Missing");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "✅ Set" : "❌ Missing");
console.log("MONGO_URL:", process.env.MONGO_URL ? "✅ Set" : "❌ Missing");
console.log("============================");

if (process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET) {
    console.log("✅ All Cloudinary credentials are set");
} else {
    console.log("❌ Some Cloudinary credentials are missing!");
    console.log("    This will cause file uploads to fail");
}
