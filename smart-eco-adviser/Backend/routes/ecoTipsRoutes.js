const express = require("express");
const { getEcoTips } = require("../controllers/ecoTipsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getEcoTips);

module.exports = router;
