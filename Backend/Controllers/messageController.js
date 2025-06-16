const Message = require("../model/message.model");
const User = require("../model/userModel"); 
const { emitToRoom } = require("../socket/socket");

// Your existing getAllMessages (which is effectively getMessagesByRoom)
module.exports.getMessagesByRoom = async (req, res) => {
  const { roomId } = req.params;
  // const userId = req.user._id; // Current user ID from auth middleware

  try {
    if (!roomId) {
      return res.status(400).json({ error: "Room ID is required" });
    }
    const messages = await Message.find({ roomId })
      .populate("senderId", "fullname profilepic _id") // Ensure _id is populated
      // .populate("recipientId", "fullname profilepic _id") // Optional if needed
      .sort({ timestamp: 1 }); 

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.sendMessage = async (req, res) => {
  try {
    const { roomId, senderId, senderName, receiverId, text, timestamp } = req.body;

    if (!roomId || !senderId || !receiverId || !text || !senderName) {
      return res.status(400).json({ message: "Missing required fields for message (roomId, senderId, receiverId, senderName, text are required)." });
    }

    const senderExists = await User.findById(senderId);
    const receiverExists = await User.findById(receiverId);

    if (!senderExists || !receiverExists) {
        return res.status(404).json({ message: "Sender or Receiver not found." });
    }

    const newMessage = new Message({
      roomId,
      senderId,
      senderName,
      recipientId: receiverId, // Mapped from frontend's receiverId
      text,
      timestamp: timestamp || new Date(),
      // isRead will default to false based on schema
    });

    await newMessage.save();
    
    // Populate sender details for the message to be emitted
    // This ensures the emitted message has the sender's info, similar to fetched messages
    const populatedMessage = await Message.findById(newMessage._id)
                                      .populate('senderId', 'fullname profilepic _id')
                                      .lean(); // Use .lean() for a plain JS object

    if (populatedMessage) {
      // Prepare the message structure for emission, consistent with frontend expectations
      const messageToEmit = {
        _id: populatedMessage._id.toString(),
        roomId: populatedMessage.roomId,
        senderId: populatedMessage.senderId._id.toString(), // Ensure senderId is a string
        senderName: populatedMessage.senderId.fullname,    // Get senderName from populated object
        text: populatedMessage.text,
        timestamp: populatedMessage.timestamp.toISOString(),
        // Add any other fields your frontend's handleNewMessage might expect
      };
      emitToRoom('receiveMessage', messageToEmit, roomId); // Use this instead of req.io
      console.log(`Emitted message to room ${roomId}:`, messageToEmit.text);
    }

    res.status(201).json({ message: "Message saved successfully", data: populatedMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error saving message', details: error.errors });
    }
    res.status(500).json({ message: 'Internal server error while saving message' });
  }
};

// New function to mark messages as read in a specific room for the current user
module.exports.markMessagesAsRead = async (req, res) => {
  try {
    const { roomId } = req.body; // Or req.params if you prefer
    const userId = req.user._id; // Logged-in user who is reading the messages

    if (!roomId) {
      return res.status(400).json({ message: "Room ID is required." });
    }

    const result = await Message.updateMany(
      { 
        roomId: roomId, 
        recipientId: userId, // Only mark messages where the current user is the recipient
        isRead: false 
      },
      { $set: { isRead: true } }
    );

    // TODO: Emit a socket event to this user (userId) to update their unread count display
    // Example: req.io.to(userId.toString()).emit('unreadCountUpdated', { newCount: updatedUnreadCountForUser });

    res.status(200).json({ message: "Messages marked as read successfully.", modifiedCount: result.nModified });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// New function to get the count of unread messages for the current user
module.exports.getUnreadMessagesCount = async (req, res) => {
  try {
    const userId = req.user._id; // Logged-in user

    const count = await Message.countDocuments({
      recipientId: userId,
      isRead: false,
      senderId: { $ne: userId } // Optionally, don't count your own unread messages if that's a use case
    });

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    console.error('Error fetching unread messages count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};