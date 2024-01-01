import express from "express";
import dbConnect from "./config/dbConfig.js";
import router from "./router/user-routes.js";
import blog_router from "./router/blog-routes.js";

import cors from "cors";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/users", router);
app.use("/api/blogs", blog_router);

app.use("*",(req, res)=>{
    res.status(404).send({message: 'Not Found'})
})

const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`🚀 Server is running on ${process.env.PORT || PORT}`);
  dbConnect();
});
