import supertest from "supertest";
import { prisma } from "../../prisma";
import app from "../../server";

export const request = supertest(app);
const PWD = "Passw0rd!";

/* Réinitialise la DB avant CHAQUE fichier de tests */
export async function resetDB() {
  await prisma.$transaction([
    prisma.taskCategory.deleteMany(),
    prisma.task.deleteMany(),
    prisma.project.deleteMany(),
    prisma.category.deleteMany(),
    prisma.status.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}

export async function getToken() {
  const email = `u${Date.now()}@t.com`;

  /* accepte 200 (create) ou 409 (déjà inscrit) */
  await request
    .post("/api/auth/register")
    .send({ email, password: PWD })
    .ok((res) => [200, 201, 409].includes(res.status));

  const { body } = await request
    .post("/api/auth/login")
    .send({ email, password: PWD });

  return body.token as string;
}
