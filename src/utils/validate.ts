import { constants, promises as fs } from "fs";
import path from "path";
import { ImageProcessingQuery } from "./model/ImageProcessingQuery";
import { Result } from "./model/Result";

const imagesFullPath = path.resolve(__dirname, "../../assets/full");
const imagesThumbPath = path.resolve(__dirname, "../../assets/thumb");

/**
 * Validating the query parameters
 * @param {ImageProcessingQuery} params Parameters.
 * @param {string} [params.filename] Filename.
 * @param {string} [params.width] width.
 * @param {string} [params.height] height.
 * @return {null|string} null, if image available, else error message.
 */
export const validateQuery = async (
  query: ImageProcessingQuery
): Promise<null | string> => {
  if (!query.filename) {
    return "File name is required";
  } else if (
    query.height === undefined ||
    query.height === null ||
    query.width === undefined ||
    query.width === null
  ) {
    return "Provide height and width as parameters to resize image";
  }

  var fileExist = await isFileExist(getImagePath(query.filename, false));
  if (fileExist) {
    return null;
  } else {
    return "Provided filename does not exist";
  }
};

/**
 * Validates whether file exists or not. Returns boolean
 * @param {string} [path] File Path.
 * @return {boolean} true, if image exists, else doesn't exists.
 */
export const isFileExist = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
};

/**
 * To Fetch the image path based on isThumbnail boolean value
 * @param {string} [params.filename] Filename.
 * @param {boolean} [params.isThumbnail] If Thumbnail file path will be assets/thumb, else assets/full.
 * @param {number} [params.width] width.
 * @param {number} [params.height] height.
 * @return {string} returns absolute path.
 */
export const getImagePath = (
  filename: string,
  isThumbnail: boolean,
  width?: number|null,
  height?: number|null
) => {
    if(isThumbnail){
        if(height && width){
            filename = `${filename}_${width}x${height}`;
        }
        return path.resolve(imagesThumbPath, `${filename}.jpg`)
    }
    return path.resolve(imagesFullPath, `${filename}.jpg`);
};
