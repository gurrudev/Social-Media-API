import express from 'express'
import dbConnect from './config/dbConfig.js'
import router from './router/user-routes.js'
import blog_router from './router/blog-routes.js'

const app = express()

app.use(express.json())
app.use('/api/users', router)
app.use('/api/blogs', blog_router)

const PORT = 5000
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT || PORT}`)
    dbConnect();
})