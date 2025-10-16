const express = require("express");
const {
  saveCalculation,
  getHistory,
  getAnalytics
} = require("../controllers/carbonController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/calculate", protect, saveCalculation);
router.get("/history", protect, getHistory);
router.get("/analytics", protect, getAnalytics);

module.exports = router;
