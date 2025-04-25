import supertest from "supertest";
import app from "../server";

export const request = supertest(app);

export async function authToken() {
  const email = `u${Date.now()}@t.com`;
  await request
    .post("/api/auth/register")
    .send({ email, password: "123456789" });
  const { body } = await request
    .post("/api/auth/login")
    .send({ email, password: "123456789" });
  return body.token as string;
}
