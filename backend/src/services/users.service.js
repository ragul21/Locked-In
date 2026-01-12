import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserByIDService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("user not found");
  }

  return user;
};
