const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.post('/eco-chat', chatController.ecoChat);

module.exports = router;