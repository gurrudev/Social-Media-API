import express from "express";
import dbConnect from "./config/dbConfig.js";
import router from "./router/user-routes.js";
import blog_router from "./router/blog-routes.js";

import cors from "cors";
// import YAML from "yamljs";
// import swaggerUI from "swagger-ui-express";
const app = express();
app.use(express.json());
const corsConfig = {
  origin: "*",
  credential : true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}

app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.urlencoded({ extended: true }));

// const swaggerDocument = YAML.load("./swagger.yaml");

// app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/users", router);
app.use("/api/blogs", blog_router);

app.get('/', (req, res) => {
  res.send('🚀 Server is running');
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
  dbConnect();
});
