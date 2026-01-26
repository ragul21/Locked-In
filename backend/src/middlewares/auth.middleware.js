// ============================================================================================
//                                        THIS CHECKS WHETHER TOKEN IS VALID OR NOT
// ============================================================================================

import jwt from "jsonwebtoken";

export const tokenChecker = (req, res, next) => {
  const token = req.cookies.token; // Read token from cookie instead of Authorization header

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    res.status(401).json({ message: "User unauthorized" });
  }
};
