import { prisma } from "../prisma";

export const CategoryService = {
  list(userId: string) {
    return prisma.category.findMany({ where: { userId } });
  },

  create(userId: string, name: string, color: string) {
    return prisma.category.create({ data: { userId, name, color } });
  },

  update(userId: string, id: string, data: any) {
    return prisma.category.update({ where: { id, userId }, data });
  },

  async remove(userId: string, id: string) {
    const inUse = await prisma.task.count({
      where: {
        userId, // sécurité multi-tenant
        categories: {
          some: { id }, // au moins UNE tâche possède cette cat.
        },
      },
    });

    if (inUse) throw new Error("CATEGORY_IN_USE");

    return prisma.category.delete({ where: { id, userId } });
  },
};
