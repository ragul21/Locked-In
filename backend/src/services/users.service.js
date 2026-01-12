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

export const updateUserByIdService = async (id, data) => {
  const { firstName } = data; // take value of first name from data variable and store it in firstname
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { firstName }, // data : {} means change the column name firstname to value in the firstname
    select: {
      id: true,
      firstName: true,
      email: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

export const deleteByIdService = async (id) => {
  await prisma.user.delete({
    where: { id },
  });
};
