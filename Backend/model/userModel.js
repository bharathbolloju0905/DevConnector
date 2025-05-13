const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    profilepic:{
        type: String,
        default: "https://iconarchive.com/download/i107195/Flat-Design/User-Profile-2/user-profile-icon.ico"
    }
});

module.exports = mongoose.model("User", userSchema);