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
            return res.status(404).json({ message: 'No Blogs found' })
        }

        return res.status(200).json({ blogs_data })

    }

    static addBlogs = async (req, res, next) => {
        const { title, description, image, user } = req.body;

        let existingUser;

        try {
            existingUser = await User.findById(user)
        } catch (err) {
            console.log(err)
        }

        if(!existingUser){
            return res.status(501).send('Invalid ID')
        }

        const blogs_data = new Blogs({
            title,
            description,
            image,
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
        const { title, description } = req.body
        let blog;

        try {
            blog = await Blogs.findById(blogId, {
                title,
                description,
            })
        } catch (err) {
            return console.log(err)
        }

        if (!blog) {
            return res.status(500).json({ massage: 'Unable to update the Blog' })
        }

        return res.status(200).json({ blog })

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
            return res.status(404).json({ message: 'No Blog Found' })
        }

        return res.status(200).json({ blog })
    }

    static deleteBlogById = async (req, res, next) => {
        const id = req.params.id;

        let blog;

        try {
            blog = await Blogs.findByIdAndRemove(id).populate('user')
            await blog.user.blog.pull(blog)
            await blog.user.save()
        } catch (err) {
            console.log(err);
        }

        if (!blog) {
            return res.status(400).json({ message: 'Unable to delete' })
        }

        return res.status(200).json({ message: 'Deleted Successfully' })
    }

}

export default BlogsController