const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ecoChatRoutes = require('./routes/chatRoutes'); // adjust path if needed

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Enable CORS
app.use(
  cors({
    origin: "*", // allow all origins (you can restrict later to your frontend URL)
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Routes
app.use('/api/gemini/', ecoChatRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Smart Eco Advisor Backend is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
