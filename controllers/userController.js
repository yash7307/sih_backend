const User = require("../models/User");

exports.saveUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.json({ success: true, message: "User saved successfully!" });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "Error saving user", details: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
};
