import { prisma } from "../src/prisma";
import { hashPwd } from "../src/utils/password";
(async () => {
  const user = await prisma.user.create({
    data: {
      email: "demo@example.com",
      hashedPassword: await hashPwd("demo"), // on hashera ensuite
    },
  });
  await prisma.column.createMany({
    data: [
      { name: "To Do", position: 0, userId: user.id },
      { name: "In Progress", position: 1, userId: user.id },
      { name: "Done", position: 2, userId: user.id },
    ],
  });
  console.log("Seed done ✅");
  await prisma.$disconnect();
})();
