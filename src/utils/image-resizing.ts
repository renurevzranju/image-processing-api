import sharp from "sharp";
import { ImageResizeOptions } from "./model/ImageResizeOptions";

/**
 * Image resizing options are passed as parameters
 * @param {ImageResizeOptions} params Parameters.
 * @param {string} [params.imagePath] Source path of the file.
 * @param {string} [params.width] resize width.
 * @param {string} [params.height] resize height.
 * @param {string} [params.targetPath] Target path of the file.
 * @return {null|string} null, if image is processed, else error message.
 */
const resizeImage = async (
  params: ImageResizeOptions
): Promise<null | string> => {
  try {
    await sharp(params.imagePath)
      .resize(params.width, params.height)
      .toFormat("jpeg")
      .toFile(params.targetPath);
    console.log(
      `Successfully processed the image and saved to ${params.targetPath}`
    );
    return null;
  } catch {
    return "Image could not be processed. Try again.";
  }
};

export default resizeImage;
