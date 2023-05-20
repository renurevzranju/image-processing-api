import { promises as fs } from "fs";
import resizeImage from "./../../utils/image-resizing";
import { getImagePath } from "../../utils/validator";

describe("Testing the resizeImage method", (): void => {
  it("should return error message if invalid width is provided", async (): Promise<void> => {
    const result = await resizeImage({
      imagePath: getImagePath("fjord.jpg", false),
      targetPath: getImagePath("fjord.jpg", true),
      height: 500,
      width: null,
    });
    expect(result).toBe("Image could not be processed. Try again.");
  });

  it("should return error message if invalid height is provided", async (): Promise<void> => {
    const result = await resizeImage({
      imagePath: getImagePath("fjord.jpg", false),
      targetPath: getImagePath("fjord.jpg", true),
      height: null,
      width: 10,
    });
    expect(result).toBe("Image could not be processed. Try again.");
  });
});

describe("Testing the resizeImage method with valid data", (): void => {
  it("should return null if valid input is provided", async (): Promise<void> => {
    const result = await resizeImage({
      imagePath: getImagePath("santamonica", false),
      targetPath: getImagePath("santamonica", true, 50, 50),
      height: 500,
      width: 500,
    });
    expect(result).toBeNull();
  });

  afterEach(async () => {
    //Files created by test environments are unlinked
    try {
      await fs.access(getImagePath("santamonica", true, 50, 50));
      fs.unlink(getImagePath("santamonica", true, 50, 50));
    } catch (e) {
      console.log(e);
    }
  });
});
