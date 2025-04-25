import { prisma } from "../prisma";

export const ProjectService = {
  list(userId: string) {
    return prisma.project.findMany({ where: { userId } });
  },
  create(userId: string, name: string) {
    return prisma.project.create({ data: { userId, name } });
  },
  update(userId: string, id: string, data: any) {
    return prisma.project.update({ where: { id, userId }, data });
  },
  async remove(userId: string, id: string) {
    const inUse = await prisma.task.count({
      where: { userId, projectId: id },
    });
    if (inUse) throw new Error("PROJECT_IN_USE");
    return prisma.project.delete({ where: { id, userId } });
  },
};
