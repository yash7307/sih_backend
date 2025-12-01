require('dotenv').config();
const cloudinary = require('./config/cloudinary');
const path = require('path');

// Use the path to one of the generated images
const imagePath = "C:\\Users\\yashs\\.gemini\\antigravity\\brain\\6ee932d4-ba23-4429-be8e-2954e19d6af2\\test_passport_photo_1764380740888.png";

console.log("Attempting to upload:", imagePath);
console.log("Cloud Name:", process.env.CLOUD_NAME);

cloudinary.uploader.upload(imagePath, { folder: "sih_uploads" })
    .then(result => {
        console.log("✅ Upload Successful!");
        console.log("URL:", result.secure_url);
    })
    .catch(error => {
        console.error("❌ Upload Failed!");
        console.error(error);
    });
