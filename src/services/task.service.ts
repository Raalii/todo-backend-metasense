import { prisma } from "../prisma";

export const TaskService = {
  list(userId: string) {
    return prisma.task.findMany({
      where: { userId },
      orderBy: [
        { column: { position: "asc" } },
        { position: "asc" },
        { createdAt: "asc" },
      ],
    });
  },

  create(userId: string, data: any) {
    return prisma.task.create({ data: { ...data, userId } });
  },

  update(id: string, userId: string, data: any) {
    return prisma.task.update({ where: { id, userId }, data });
  },

  remove(id: string, userId: string) {
    return prisma.task.delete({ where: { id, userId } });
  },
};
