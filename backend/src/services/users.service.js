// ==============================================================================================================
//       HANDLES THE PROFILE PAGE SHOW AND EDIT (GET AND UPDATE) FUNCTIONALITIES
// ==============================================================================================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*----- GOES AND GETS THE DETAILS FROM THE DB USING THE ID FROM THE TOKEN AND SENDS IT BACK TO THE PROFILE PAGE---- */

export const getUserByIDService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },

    /* WE USE SELECT QUERY TO RETURN THE ONLY SELECT FIELDS THAT WE ARE GOING TO SHOW TO THE USER IN PROFILE PAGE  */
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

/* ------------------------------------UPDATES THE USER DETAILS IN THE DB AND RETURNS THE UPDATED USER---------------------------------------------------------------- */

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
