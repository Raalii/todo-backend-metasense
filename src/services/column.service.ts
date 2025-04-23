import { prisma } from "../prisma";

export const ColumnService = {
  findAll(userId: string) {
    return prisma.column.findMany({
      where: { userId },
      orderBy: { position: "asc" },
    });
  },
  create(userId: string, data: { name: string; position: number }) {
    return prisma.column.create({ data: { ...data, userId } });
  },
  update(id: string, userId: string, data: any) {
    return prisma.column.update({ where: { id, userId }, data });
  },
  remove(id: string, userId: string) {
    return prisma.column.delete({ where: { id, userId } });
  },
};
