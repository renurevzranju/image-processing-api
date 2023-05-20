import express from "express";
import { validateQuery } from "../../utils/validate";
import resizeImage from "../../utils/image-resizing";
import { ImageResizeOptions } from "../../utils/model/ImageResizeOptions";
import path from "path";

const images = express.Router();

const imagesFullPath = path.resolve(__dirname, "../../../assets/full");
const imagesThumbPath = path.resolve(__dirname, "../../../assets/thumb");

images.get('/', async (request: express.Request, response: express.Response) => {
    var validation = await validateQuery(request.query);
    if(validation) {
        response.send(validation);
        return;
    }

    var options: ImageResizeOptions = {
        imagePath: path.resolve(imagesFullPath, `${request.query.filename}.jpg`),
        targetPath: path.resolve(imagesThumbPath, `${request.query.filename}.jpg`)
    }
    console.log(options);
    var processImage = await resizeImage(options);
    console.log(processImage);
    if(processImage) {
        response.send(processImage);
    }
    else{
        response.sendFile(options.targetPath);
    }
});

export default images;