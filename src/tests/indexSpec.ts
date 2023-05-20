import { app } from "../index";
import { promises as fs } from "fs";
import { getImagePath } from "../utils/validator";
import supertest from "supertest";

const request = supertest(app);

describe("server endpoint testing", (): void => {
  it("should return 200 for get / endpoint request", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("should return 200 for get /api/images endpoint request", async (): Promise<void> => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(200);
  });

  it("should return 200 for get /api/images?filename=palmtunnel&width=200 with missing params", async (): Promise<void> => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=200"
    );
    expect(response.status).toBe(200);
  });

  it("should return 404 for get /foo endpoint request", async (): Promise<void> => {
    const response = await request.get("/foo");
    expect(response.status).toBe(404);
  });
});

describe("server endpoint testing for image resizing", (): void => {
  afterEach(async () => {
    //Files created by test environments are unlinked
    try {
      await fs.access(getImagePath("santamonica", true, 50, 50));
      fs.unlink(getImagePath("santamonica", true, 50, 50));
    } catch (e) {
      console.log(e);
    }
  });

  it("should return 200 for get /api/images?filename=santamonica&width=50&height=50 with valid params", async (): Promise<void> => {
    const response = await request.get(
      "/api/images?filename=santamonica&width=50&height=50"
    );
    expect(response.status).toBe(200);
  });
});
