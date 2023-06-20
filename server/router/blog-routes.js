import express from 'express';
import BlogsController from '../controller/blog-controller.js';

const blog_router = express.Router();

blog_router.get('/',BlogsController.getAllBlogs)
blog_router.post('/add',BlogsController.addBlogs)

export default blog_router

