const express = require("express");
const router = express.Router();
const { saveUser, getUsers } = require("../controllers/userController");

const parser = require("../middleware/upload");

router.post("/register", (req, res, next) => {
    parser.fields([
        { name: "aadhar", maxCount: 1 },
        { name: "photo", maxCount: 1 },
        { name: "certificates", maxCount: 10 }
    ])(req, res, (err) => {
        if (err) {
            console.error("Multer/Cloudinary Error:", err);
            return res.status(500).json({ error: "Upload Error", details: err.message || err });
        }
        next();
    });
}, saveUser);
router.get("/all", getUsers);

module.exports = router;
