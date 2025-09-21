const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // MongoDB connection
const ecoChatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes"); // new auth routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(
  cors({
    origin: "*", // change later to your frontend URL in production
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/api/gemini", ecoChatRoutes);   // existing routes
app.use("/api/auth", authRoutes);        // new login/signup routes

// Health check route
app.get("/", (req, res) => {
  res.send("Smart Eco Advisor Backend is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
