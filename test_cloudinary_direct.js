const cloudinary = require('cloudinary').v2;
const path = require('path');

// Hardcoded credentials for verification
cloudinary.config({
    cloud_name: 'dsf0yp2hr',
    api_key: '563713949862699',
    api_secret: 'd_HSX5dQCyDnZaCWltF0SNyDVwk'
});

// Use the path to one of the generated images
const imagePath = "C:\\Users\\yashs\\.gemini\\antigravity\\brain\\6ee932d4-ba23-4429-be8e-2954e19d6af2\\test_passport_photo_1764380740888.png";

console.log("Attempting to upload with HARDCODED credentials...");

cloudinary.uploader.upload(imagePath, { folder: "sih_uploads" })
    .then(result => {
        console.log("✅ Upload Successful!");
        console.log("URL:", result.secure_url);
    })
    .catch(error => {
        console.error("❌ Upload Failed!");
        console.error(error);
    });
