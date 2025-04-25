import { getToken, request } from "./helpers/client";

describe("Projects", () => {
  let token: string;
  beforeAll(async () => (token = await getToken()));

  it("create & update & delete", async () => {
    const proj = await request
      .post("/api/projects")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "P1" })
      .expect(201);
    const id = proj.body.id;

    await request
      .put(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "P1-mod" })
      .expect(200);

    await request
      .delete(`/api/projects/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);
  });
});
