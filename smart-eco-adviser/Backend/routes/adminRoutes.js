const express = require("express");
const {
  getAllUsers,
  getUserDetails,
  getDashboardStats
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getUserDetails);
router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;
