import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"; //never store actual passwords in db store only hashed passwords
import jwt from "jsonwebtoken";

// ================================================================================================================================
//                                 SIGNIN SERVICE
// ================================================================================================================================

const prisma = new PrismaClient();
export const createUser = async (data) => {
  const { firstName, email, password } = data; //destructuring

  // ================================================================================================================================
  //                                 This below part is about checking whether there is already an same email  exist in the database
  // ================================================================================================================================

  /* If user exsist it returns the row user object if not then NULL */
  const exsistingUser = await prisma.user.findUnique({ where: { email } }); //checking whether the email entered by the user already exsist in the db

  /* If success error is thrown , this function stops , controller will catch this error object */
  if (exsistingUser) {
    throw new Error("email already exsist"); //creates new error object
  }

  // ================================================================================================================================
  //                                 BEFORE STORING THE DATA IN DB WE MUST HASH IT USING THE BCRYPT LIBRARY
  // ================================================================================================================================

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

/* CONTROL GOES BACK TO SIGNUPUSERSERVICE BELOW */

export const signUpUserService = async (data) => {
  const user = await createUser(data); //COMPLETED AND GOT THE USER OBJECT FROM PRISMA

  /* CREATING A TOKEN AND SENDING IT BACK TO THE USER */
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token }; //TOKEN GOES BACK TO THE CONTROLLER
};

// ================================================================================================================================
//                                 SIGN IN SERVICE
// ================================================================================================================================

export const signInUserService = async (data) => {
  const { email, password } = data; //DESTRUCTURING

  const user = await prisma.user.findUnique({ where: { email } }); //CHECKING IF THE USER ALREADY EXIST

  if (!user) {
    throw new Error("No account found with this email");
  }

  /* COMPARES BOTH THE PASSWORD AND THE DATABASE HASHED PASSWORD */
  const isMatch = await bcrypt.compare(password, user.password); //compare extracts the salt out of respective hash and merges it with the actual passoword that it got and rehashes it and compares if both are same then the user password matches

  /* IF THE PASSWORDS DONT MATCH WE THROW ERROR OBJECT WHICH WILL BE HANDLED BY THE CONTROLLER */
  if (isMatch === false) {
    throw new Error("invalid email or password");
  }
  /* CREATING AND SENDING A TOKEN IN RESPONSE AFTER SUCCESSFULL LOGIN  */
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return { token };
};
