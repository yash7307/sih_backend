const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const userRoutes = require("./routes/userRoutes");

// 📌 Routes
app.use("/api/youth", userRoutes);

// 📌 Test Route
app.get("/", (req, res) => {
    res.send("Backend Running...");
});

// 📌 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);
