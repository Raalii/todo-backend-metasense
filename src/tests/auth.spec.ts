import { request } from "./helpers/client";
const PWD = "Passw0rd!";

describe("Auth", () => {
  it("register + login flow", async () => {
    const email = `me${Date.now()}@x.com`;
    await request
      .post("/api/auth/register")
      .send({ email, password: PWD })
      .expect(201);

    const res = await request
      .post("/api/auth/login")
      .send({ email, password: PWD })
      .expect(200);
    expect(res.body.token).toBeDefined();
  });
});
