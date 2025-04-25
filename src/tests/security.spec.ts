import jwt from "jsonwebtoken";
import { getToken, request } from "./helpers/client";

const API = "/api/projects"; // route protégée minimale

describe("Security (authenticateJWT)", () => {
  let goodToken: string;

  beforeAll(async () => {
    goodToken = await getToken();
  });

  it("1) 401 when Authorization header missing", async () => {
    await request.get(API).expect(401);
  });

  it("2) 401 when scheme is not Bearer", async () => {
    await request.get(API).set("Authorization", "Basic abc").expect(401);
  });

  it("3) 401 when token is random garbage", async () => {
    await request.get(API).set("Authorization", "Bearer xyz123").expect(401);
  });

  it("4) 401 when token signed with wrong secret", async () => {
    const badToken = jwt.sign({ sub: "fake" }, "WRONG_SECRET", {
      expiresIn: "1h",
    });
    await request
      .get(API)
      .set("Authorization", `Bearer ${badToken}`)
      .expect(401);
  });

  it("5) 401 when token expired", async () => {
    const expired = jwt.sign({ sub: "fake" }, process.env.JWT_SECRET!, {
      expiresIn: "-1s",
    });
    await request
      .get(API)
      .set("Authorization", `Bearer ${expired}`)
      .expect(401);
  });

  it("6) 200 with valid token", async () => {
    await request
      .get(API)
      .set("Authorization", `Bearer ${goodToken}`)
      .expect(200);
  });
});
