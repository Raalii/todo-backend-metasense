import { getToken, request } from "./helpers/client";

describe("Categories", () => {
  let token: string;
  beforeAll(async () => (token = await getToken()));

  it("validate color (400)", async () => {
    await request
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Bad", color: "blue" })
      .expect(400);
  });

  it("create OK", async () => {
    await request
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Dev", color: "#ff9e9e" })
      .expect(201);
  });
});
