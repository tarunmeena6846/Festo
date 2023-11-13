import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
const SECRET = "SECRET";

export function isUserAdmin(req: NextApiRequest) {
  const authHeader = req.headers.authorization;
  const isAdmin = false;
  console.log("tarun header ", authHeader);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    let user = jwt.verify(token, SECRET);
    console.log("tarun at me", user);
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  }
}
export default isUserAdmin;
