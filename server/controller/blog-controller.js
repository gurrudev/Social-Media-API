import Blogs from "../models/Blog.js";

class BlogsController{
    static getAllBlogs = async(req, res, next) => {
        let blogs_data;

        try {
            blogs_data = await Blogs.find()
        } catch (err) {
            return console.log(err);
        }

        if(!blogs_data){
            return res.status(404).json({message: 'No Blogs found'})
        }

        return res.status(200).json({blogs_data})

    }

    static addBlogs = async(req, res, next) => {
        const {title, description, image, user} = req.body;

        const blogs_data = new Blogs({
            title,
            description,
            image,
            user,
        })

        try {
            await blogs_data.save()
        } catch (err) {
            return console.log(err);
        }

        return res.status(200).json({blogs_data})
    }
}

export default BlogsController