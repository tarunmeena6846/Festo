// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ensureDbConnected } from "@/lib/dbconnect";
import { Admin } from "db";
const SECRET = "SECRET";

type Data = {
  token?: string;
  message?: string;
  name?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("handler called");
  await ensureDbConnected();
  const { username, password } = req.body;
  console.log("tarun at admin  in signin", username, password);

  const bIsAdminPresent = await Admin.findOne({
    username: username,
    password: password,
  });

  if (bIsAdminPresent) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.status(200).json({ message: "Login sucessfull", token });
  } else {
    console.log("tarun in unauthorized");
    res.json({ message: "unauthorized" });
  }
}
