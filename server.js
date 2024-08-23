import express from "express";
// import dbConnect from "./config/dbConfig.js";
import router from "./router/user-routes.js";
import blog_router from "./router/blog-routes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

import cors from "cors";
// import YAML from "yamljs";
// import swaggerUI from "swagger-ui-express";
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// const swaggerDocument = YAML.load("./swagger.yaml");

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/users", router);
app.use("/api/blogs", blog_router);

app.get('/', (req, res) => {
  res.send('🚀 Server is live!');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '!Oops page not found',
  });
});

const PORT = 3001;
app.listen(process.env.PORT || PORT, () => {
  console.log(`🚀 Server is running on ${process.env.PORT || PORT}`);
  mongoose.connect(`mongodb+srv://${process.env.MONGO_CRED}.mongodb.net/BLOG-API`).then(() => {
    console.log('DB Connected :)')
  }).catch((e) => {
    console.log(e)
  })
});
