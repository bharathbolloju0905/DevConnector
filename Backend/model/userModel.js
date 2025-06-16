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
        default: "/uploads/defaultimage.jpeg"
    },
    profession:{
        type: String,
        default: "Student"
    },
    bio:{
        type: String,
        default: "Hello, I am a new user"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: []
    },
    posts: {
       type: [mongoose.Schema.Types.ObjectId],
        ref: "Post",
        default: []
    },
    contact:{
        website:{
            type: String,
            default: "https://www.google.com"
        },
        github:{
            type: String,
            default: "https://github.com"
        },
        address:{
            type: String,
            default: "Hyderabad, India"
        }
    },
    education:{
        type:[
            {
                nameofCollege:{
                    type: String,
                    default: "N/A"
                },
                class:{
                    type: String,
                    default: "N/A"
                },
                startdate:{
                    type: Date,
                    default: Date.now
                },
                enddate:{
                    type: Date,
                    default: Date.now
                },

            }
        ],
        default: []
    },
    experience:{
        type:[
            {
                company:{
                    type: String,
                    default: "N/A"
                },
                role:{
                    type: String,
                    default: "N/A"
                },
                startdate:{
                    type: Date,
                    default: Date.now
                },
                enddate:{
                    type: Date,
                    default: Date.now
                },

            }
        ],
        default: []
    },
    skills: {
        type: [String],
        default: []
    }

});

module.exports = mongoose.model("User", userSchema);