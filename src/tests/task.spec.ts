import { getToken, request } from "./helpers/client";

describe("Task API", () => {
  let token: string, statusId: string, projectId: string, taskId: string;

  beforeAll(async () => {
    token = await getToken();
    statusId = (
      await request.get("/api/statuses").set("Authorization", `Bearer ${token}`)
    ).body[0].id;
    projectId = (
      await request
        .post("/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "P1" })
    ).body.id;
  });

  it("creates a task", async () => {
    const res = await request
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "T", statusId, projectId });
    expect(res.status).toBe(201);
    taskId = res.body.id;
  });

  it("updates it", async () => {
    const res = await request
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "T mod" });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe("T mod");
  });

  it("404 on unknown id", async () => {
    const res = await request
      .put("/api/tasks/ffffffff-ffff-ffff-ffff-ffffffffffff")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "X" });
    expect(res.status).toBe(404);
  });

  it("deletes → 204", async () => {
    const res = await request
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
