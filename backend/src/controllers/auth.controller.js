import { createUser } from "../services/auth.service.js";

export const signup = async (req, res) => {
  const user = await createUser(req.body); // returns promise , freezes this controller function till the promise gets resolved

  res.json(user); // await resolves the promise once fullfilled and json converts the object into json string and sends the response and ends the session
};
