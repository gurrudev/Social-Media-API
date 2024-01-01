import mongoose from "mongoose";
import Blog from "./Blog.js";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profile_pic: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    user_title: {
        type: String,
    },
    bio: {
        type: String,
    },
    location: {
        city: { type: String },
        country: { type: String },
    },
    skills: {
        type: [String],
    },
    blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog", required: true }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
