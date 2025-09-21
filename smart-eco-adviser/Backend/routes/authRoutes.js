const express = require("express");
const { signup, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Example protected route
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}, this is your dashboard!` });
});

module.exports = router;
