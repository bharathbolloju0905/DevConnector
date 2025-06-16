const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomId: { 
      type: String, 
      required: true, 
      index: true 
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
      required: true, 
    },
    recipientId: { // This field should exist if you're tracking recipient per message
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String, 
      required: true 
    },
    timestamp: { 
      type: Date, 
      default: Date.now 
    },
    isRead: { // New field for read status
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Message", messageSchema);