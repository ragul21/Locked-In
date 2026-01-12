import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (data) => {
  const { firstName, email, password } = data; //destructuring

  const exsistingUser = await prisma.user.findUnique({ where: { email } }); //checking whether the email entered by the user already exsist in the db
  if (exsistingUser) {
    throw new Error("email already exsist");
  }
  return prisma.user.create({
    // returns promise object immediately

    data: {
      firstName,
      email, //returns js object
      password,
    },
  });
};

export const signInUserService = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("No account found with this email");
  }

  if (user.password !== password) {
    throw new Error("invalid email or password");
  }

  return user;
};
