import { prisma } from "../../prisma";
import { resetDB } from "./client";

export default async () => {
  await resetDB();
  return () => prisma.$disconnect(); // afterAll global
};
