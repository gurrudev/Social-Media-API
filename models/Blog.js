import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image_url: {
        type: String,
        required: true
    },

    blog_tags: {
        type: [String],
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },

    createdAt:{
        type : Date,
        default : Date.now(),
    },

    updatedAt:{
        type : Date
    }

})

const Blogs = mongoose.model('Blog',blogSchema);

export default Blogs