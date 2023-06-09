import express from "express";
import {
  validateQuery,
  getImagePath,
  isFileExist,
} from "../../utils/validator";
import resizeImage from "../../utils/image-resizing";
import { ImageResizeOptions } from "../../utils/model/ImageResizeOptions";

const images = express.Router();

images.get(
  "/",
  async (request: express.Request, response: express.Response) => {
    console.log("Started Processing the Images");
    const validation = await validateQuery(request.query);
    if (validation) {
      console.log("Query params validation failed");
      response.send(validation);
      return;
    }

    const desiredHeight = request.query.height
        ? parseInt(request.query.height as string)
        : null,
      desiredWidth = request.query.width
        ? parseInt(request.query.width as string)
        : null;

    const options: ImageResizeOptions = {
      imagePath: getImagePath(request.query.filename as string, false),
      targetPath: getImagePath(
        request.query.filename as string,
        true,
        desiredWidth,
        desiredHeight
      ),
      height: desiredHeight,
      width: desiredWidth,
    };

    const thumbnailExists = await isFileExist(options.targetPath);
    if (!thumbnailExists) {
      console.log("Thumbnail creation in progress");
      //returns null if successfully created, else error message
      const createThumbnail = await resizeImage(options);
      if (createThumbnail) {
        console.log(
          "Some error occurred while creating thumbnail. Try again later"
        );
        response.send(createThumbnail);
        return;
      }
    } else {
      console.log(`File already exists in this path ${options.targetPath} `);
    }
    response.sendFile(options.targetPath);
  }
);

export default images;
