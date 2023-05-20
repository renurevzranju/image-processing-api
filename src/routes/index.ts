import express from "express";
import images from "./api/images";
import path from "path";

const routes = express.Router();

routes.use("/api/images", images);

routes.get('/', (request, response) => {
    response.sendFile(path.resolve("./src/views/index.html"));
});

export default routes;