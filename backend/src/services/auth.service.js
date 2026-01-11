import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data) => {
  const { firstName, email, password } = data; //destructuring

  return prisma.user.create({
    // returns promise object immediately

    data: {
      firstName,
      email, //returns js object
      password,
    },
  });
};
