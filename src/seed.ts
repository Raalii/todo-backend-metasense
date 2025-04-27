/* src/seed.ts */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function seedUserDefaults(userId: string) {
  /* Statuts (Kanban) */
  const [todo, doing, done] = await prisma.$transaction([
    prisma.status.create({
      data: { userId, name: "À faire", color: "#e0e0e0" },
    }),
    prisma.status.create({
      data: { userId, name: "En cours", color: "#c6ddff" },
    }),
    prisma.status.create({
      data: { userId, name: "Terminé", color: "#b5e6c5" },
    }),
  ]);

  /* Catégorie par défaut */
  const general = await prisma.category.create({
    data: { userId, name: "Général", color: "#8e8e8e" },
  });

  /* Projet de démonstration */
  const project = await prisma.project.create({
    data: { userId, name: "Demo Project" },
  });

  /* Trois tâches exemple */
  await prisma.task.createMany({
    data: [
      {
        userId,
        title: "Bienvenue 👋",
        statusId: todo.id,
        projectId: project.id,
      },
      {
        userId,
        title: "Glissez-moi en « En cours »",
        statusId: todo.id,
        projectId: project.id,
      },
      {
        userId,
        title: "Renommez ou supprimez-moi",
        statusId: doing.id,
        projectId: project.id,
      },
    ],
  });

  /* Lie la première tâche à la catégorie “Général ” */
  await prisma.taskCategory.create({
    data: {
      taskId: (await prisma.task.findFirst({
        where: { userId, title: "Bienvenue 👋" },
      }))!.id,
      categoryId: general.id,
    },
  });
}
