import mongoose from "mongoose";
import Blogs from "../models/Blog.js";
import User from "../models/User.js";

class BlogsController {
    static getAllBlogs = async (req, res, next) => {
        let blogs_data;

        try {
            blogs_data = await Blogs.find()
        } catch (err) {
            return console.log(err);
        }

        if (!blogs_data) {
            return res.status(401).json({ message: 'No Blogs found' })
        }

        return res.status(200).json({ blogs_data })

    }

    static addBlogs = async (req, res, next) => {
        const { title, description, image_url, blog_tags, user} = req.body;

        let existingUser;

        try {
            existingUser = await User.findById(user)
        } catch (err) {
            console.log(err)
        }

        if(!existingUser){
            return res.status(501).send('Invalid User ID')
        }

        const blogs_data = new Blogs({
            title,
            description,
            image_url,
            blog_tags, 
            user,
        })

        try {
            const session = await mongoose.startSession();
            session.startTransaction();
            await blogs_data.save({session});
            existingUser.blogs.push(blogs_data)
            await existingUser.save({session})
            await session.commitTransaction()

        } catch (err) {
            console.log(err);
            return res.status(500).json({message: err})
        }

        return res.status(200).json({ blogs_data })
    }

    static updateBlogs = async (req, res, next) => {
        const blogId = req.params.id;
        const { title, description, image_url, blog_tags} = req.body
        let blog;

        try {
            blog = await Blogs.findByIdAndUpdate(blogId, {
                title,
                description,
                image_url,
                blog_tags,
                updatedAt : new Date().toISOString()
            })
        } catch (err) {
            return console.log(err)
        }

        if (!blog) {
            return res.status(500).json({ massage: 'Unable to update the Blog' })
        }

        return res.status(200).json({ massage: 'Blog has been updated!' })

    }

    static getBlogById = async (req, res, next) => {
        const id = req.params.id;

        let blog;

        try {
            blog = await Blogs.findById(id)
        } catch (err) {
            console.log(err);
        }

        if (!blog) {
            return res.status(401).json({ message: 'No Blog Found' })
        }

        return res.status(200).json({ blog })
    }

    static deleteBlogById = async (req, res, next) => {
        const id = req.params.id;

        let blog;

        try {
            blog = await Blogs.findByIdAndRemove(id).populate('user')
            await blog.user.blogs.pull(blog)
            await blog.user.save()
        } catch (err) {
            console.log(err);
        }

        if (!blog) {
            return res.status(400).json({ message: 'Unable to delete' })
        }

        return res.status(200).json({ message: 'Deleted Successfully' })
    }

    static getByUserId = async (req, res, next) => {
        const userId = await req.params.id;
        let userBlog;
        
        try {
            userBlog = await User.findById(userId).populate('blogs');

        } catch (err) {
            console.log(err);
        }

        if(!userBlog){
            return res.status(401).json({ message: 'No blogs Found' });
        }

        return res.status(200).json({ blogs: userBlog})   
    }

}

export default BlogsController