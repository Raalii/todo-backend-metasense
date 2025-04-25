import { prisma } from "../prisma";

export const StatusService = {
  list(userId: string) {
    return prisma.status.findMany({ where: { userId } });
  },
  create(userId: string, name: string, color: string) {
    return prisma.status.create({ data: { userId, name, color } });
  },
  update(userId: string, id: string, data: any) {
    return prisma.status.update({ where: { id, userId }, data });
  },
  async remove(userId: string, id: string) {
    const count = await prisma.task.count({ where: { statusId: id } });
    if (count) throw new Error("STATUS_IN_USE");
    return prisma.status.delete({ where: { id, userId } });
  },
};
