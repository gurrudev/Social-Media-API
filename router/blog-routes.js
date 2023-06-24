import express from 'express';
import BlogsController from '../controller/blog-controller.js';

const blog_router = express.Router();

blog_router.get('/',BlogsController.getAllBlogs)
blog_router.post('/add',BlogsController.addBlogs)
blog_router.put('/update/:id', BlogsController.updateBlogs)
blog_router.get('/:id', BlogsController.getBlogById)
blog_router.delete('/:id', BlogsController.deleteBlogById)
blog_router.get('/user/:id', BlogsController.getByUserId)

export default blog_router

