const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const userRoutes = require("./routes/userRoutes");

// 📌 Routes
app.use("/api/youth", userRoutes);

// 📌 Test Route
app.get("/", (req, res) => {
    res.send("Backend Running...");
});

// 📌 Global Error Handler (MUST be after all routes)
app.use((err, req, res, next) => {
    console.error("============ GLOBAL ERROR HANDLER ============");
    console.error("Error Message:", err.message);
    console.error("Error Stack:", err.stack);
    console.error("Error Object:", err);
    console.error("==============================================");

    res.status(500).json({
        error: "Internal Server Error",
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
