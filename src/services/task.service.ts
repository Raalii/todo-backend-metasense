import { prisma } from "../prisma";

export const TaskService = {
  list(userId: string, filter: any) {
    return prisma.task.findMany({
      where: {
        userId,
        projectId: filter.projectId ?? undefined,
        statusId: filter.statusId ?? undefined,
        categories: filter.categoryIds
          ? { some: { id: { in: filter.categoryIds } } }
          : undefined,
      },
      include: { categories: true, status: true, project: true },
      orderBy: { createdAt: "desc" },
    });
  },

  create(userId: string, data: any) {
    const { categoryIds = [], ...rest } = data;
    return prisma.task.create({
      data: {
        ...rest,
        userId,
        categories: { connect: categoryIds.map((id: string) => ({ id })) },
      },
      include: { categories: true, status: true, project: true },
    });
  },

  update(userId: string, id: string, data: any) {
    const { categoryIds, ...rest } = data;
    return prisma.task.update({
      where: { id, userId },
      data: {
        ...rest,
        categories: categoryIds
          ? { set: categoryIds.map((id: string) => ({ id })) }
          : undefined,
      },
      include: { categories: true, status: true, project: true },
    });
  },

  remove(userId: string, id: string) {
    return prisma.task.delete({ where: { id, userId } });
  },
};
