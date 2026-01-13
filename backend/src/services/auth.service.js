import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; //never store actual passwords in db store only hashed passwords
import jwt from "jsonwebtoken";

{
  /*--------------------------- sign up service----------------------------------- */
}
const prisma = new PrismaClient();
export const createUser = async (data) => {
  const { firstName, email, password } = data; //destructuring

  const exsistingUser = await prisma.user.findUnique({ where: { email } }); //checking whether the email entered by the user already exsist in the db
  if (exsistingUser) {
    throw new Error("email already exsist");
  }

  const hashedpass = await bcrypt.hash(password, 10); // hash adds salt(random string) to our password , then hashes for the cost factor the returns a hash which has the info about what alogrithm is used , salt , cost factor

  return prisma.user.create({
    // returns promise object immediately

    data: {
      firstName,
      email, //returns js object
      password: hashedpass, // store the hashedpass in db not the real password
    },
  });
};

export const signUpUserService = async (data) => {
  const user = await createUser(data);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};

{
  /*--------------------------- sign in service----------------------------------- */
}

export const signInUserService = async (data) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("No account found with this email");
  }

  const isMatch = await bcrypt.compare(password, user.password); //compare extracts the salt out of respective hash and merges it with the actual passoword that it got and rehashes it and compares if both are same then the user password matches

  if (isMatch === false) {
    throw new Error("invalid email or password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};
