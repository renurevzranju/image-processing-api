import express from "express";
import images from "./api/images";
import path from "path";

const routes = express.Router();

routes.use("/api/images", images);

routes.get("/", (request: express.Request, response: express.Response) => {
  response.sendFile(path.resolve("./src/index.html"));
});

export default routes;
