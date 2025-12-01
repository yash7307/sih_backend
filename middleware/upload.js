const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "sih_uploads",
            resource_type: "auto",
        };
    },
});

const parser = multer({ storage: storage });

module.exports = parser;
