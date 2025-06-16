const express = require("express");
const router = express.Router();
const messageController = require("../Controllers/messageController");
const { authenticate } = require("../middlewares/authenticateMiddleware"); // Your auth middleware

// Existing routes
router.get("/message/:roomId", authenticate, messageController.getMessagesByRoom); // Renamed for clarity if needed
router.post("/send", authenticate, messageController.sendMessage);

// New routes for unread messages
router.post("/mark-as-read", authenticate, messageController.markMessagesAsRead);
router.get("/unread-count", authenticate, messageController.getUnreadMessagesCount);

module.exports = router;