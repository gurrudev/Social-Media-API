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
        required: true
    },

    createdAt:{
        type : Date,
        default : Date.now(),
    },
    
    updatedAt:{
        type : Date
    },
    
    user: {
        type: String,
        required: true
    },
    
})

const Blogs = mongoose.model('Blog',blogSchema);

export default Blogs