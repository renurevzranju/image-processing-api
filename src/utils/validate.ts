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
export const validateQuery = async (query: ImageProcessingQuery): Promise<null|string> => {
    console.log(query);
    console.log(query.filename);
  if (!query.filename) {
    return "File name is required";
  }
  if ((query.height === undefined || query.height === null) || (query.width === undefined || query.width === null)) {
    return "Provide both height and width" ;
  }

  try {
    console.log(path.resolve(imagesFullPath, `${query.filename}.jpg`));
    await fs.access(
      path.resolve(imagesFullPath, `${query.filename}.jpg`),
      constants.R_OK | constants.W_OK
    );
    return null;
  } catch {
    return "Provided filename does not exist";
  }
};
