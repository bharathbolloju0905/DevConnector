const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
   
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required:true
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
