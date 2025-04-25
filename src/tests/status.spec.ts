import { getToken, request } from "./helpers/client";

describe("Status API", () => {
  let token: string;
  beforeAll(async () => {
    token = await getToken();
  });

  it("returns the 3 defaults", async () => {
    const res = await request
      .get("/api/statuses")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });

  it("fails on invalid body (400)", async () => {
    const res = await request
      .post("/api/statuses")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", color: "blue" });
    expect(res.status).toBe(400);
  });

  it("creates & prevents duplicate (409)", async () => {
    const body = { name: "Bloqué", color: "#ffaaaa" };
    const ok = await request
      .post("/api/statuses")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(ok.status).toBe(201);

    const dup = await request
      .post("/api/statuses")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(dup.status).toBe(409);
  });
});
