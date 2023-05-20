import { promises as fs } from "fs";
import { validateQuery, getImagePath } from "../../utils/validator";

describe("Testing the validator", (): void => {
  it("should return error message if filename is not provided", async (): Promise<void> => {
    expect(validateQuery({})).not.toBeNull();
  });

  it("should return error message if only height is provided", async (): Promise<void> => {
    expect(validateQuery({ filename: "fjord", height: 500 })).not.toBeNull();
  });

  it("should return error message if provided filename is not valid", async (): Promise<void> => {
    expect(
      validateQuery({ filename: "fjords", height: 500, width: 500 })
    ).not.toBeNull();
  });

  it("should return null if provided filename is valid", async (): Promise<void> => {
    let result: null | string = "";
    try {
      await fs.access(getImagePath("fjord", false));
      result = null;
    } catch {
      result = "File was not created";
    }
    expect(result).toBeNull();
  });

  it("should have 'full' in the path that is returned", async () => {
    expect(getImagePath("jejuIsland.jpg", false)).toContain("full");
  });

  it("should have 'thumb' in the path that is returned", async () => {
    expect(getImagePath("jejuIsland.jpg", true, 500, 600)).toContain("thumb");
  });
});
