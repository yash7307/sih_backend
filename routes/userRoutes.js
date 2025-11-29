const express = require("express");
const router = express.Router();
const { saveUser, getUsers } = require("../controllers/userController");

const parser = require("../middleware/upload");

router.post("/register", parser.fields([
    { name: "aadhar", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "certificates", maxCount: 10 }
]), saveUser);
router.get("/all", getUsers);

module.exports = router;
