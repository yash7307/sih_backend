const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinary');

const app = express();

// Test the storage configuration directly
console.log("Testing Multer + Cloudinary Storage Configuration");
console.log("=================================================");

try {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: async (req, file) => {
            console.log("params function called for file:", file.originalname);
            return {
                folder: "sih_uploads",
                resource_type: "auto",
            };
        },
    });

    console.log("✅ CloudinaryStorage created successfully");

    const parser = multer({ storage: storage });
    console.log("✅ Multer instance created successfully");

    // Create a simple test endpoint
    app.post('/test-upload', parser.single('testfile'), (req, res) => {
        console.log("Upload handler called");
        console.log("File:", req.file);
        res.json({ success: true, file: req.file });
    });

    // Error handler
    app.use((err, req, res, next) => {
        console.error("ERROR CAUGHT:", err);
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Error Stack:", err.stack);
        res.status(500).json({
            error: err.name,
            message: err.message,
            stack: err.stack
        });
    });

    const PORT = 5001;
    app.listen(PORT, () => {
        console.log(`Test server running on port ${PORT}`);
        console.log("Ready to test file upload");
        console.log("Use: curl -F 'testfile=@path/to/file.jpg' http://localhost:5001/test-upload");
    });

} catch (error) {
    console.error("❌ Error during setup:", error);
    console.error("Stack:", error.stack);
}
