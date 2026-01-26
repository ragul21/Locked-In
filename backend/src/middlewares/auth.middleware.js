// ============================================================================================
//                                        THIS CHECKS WHETHER TOKEN IS VALID OR NOT
// ============================================================================================

import jwt from "jsonwebtoken";

export const tokenChecker = (req, res, next) => {
  const tokenFromReq = req.headers.authorization; // taking the token from req object's header objects's authorization key
  // it will return something like "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  if (!tokenFromReq) {
    res.status(401).json({ message: "unauthorized" }); // if there is no token in header means unauthorized
  }

  /* take the token alone from the string */
  const tokenRaw = tokenFromReq.split(" ")[1]; // taking the first index which will have the jwt token

  if (!tokenRaw) {
    return res.status(401).json({ message: "Unauthorized" }); // if token is missing then 401
  }

  try {
    const payload = jwt.verify(tokenRaw, process.env.JWT_SECRET); // creates a signture from the payload and secret , compares it with the received token signature , if same returns a decoded payload object
    req.user = { userId: payload.userId }; //payload will have the user id ,using that we can pull the data from DB and show to people
    next();
  } catch (error) {
    res.status(401).json({ message: "user unauthorized" });
  }
};
