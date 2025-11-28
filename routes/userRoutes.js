const express = require("express");
const router = express.Router();
const { saveUser, getUsers } = require("../controllers/userController");

router.post("/register", saveUser);
router.get("/all", getUsers);

module.exports = router;
