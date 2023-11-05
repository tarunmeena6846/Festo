// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
import jwt from "jsonwebtoken";
import { ensureDbConnected } from "@/lib/dbconnect";
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
  const bIsAdminPresent = await Admin.findOne({
    username: username,
    password: password,
  });
  console.log(username, password);
  console.log("tarun", bIsAdminPresent);
  if (!bIsAdminPresent) {
    const obj = { username: req.body.username, password: req.body.password };
    console.log(obj);
    const newAdmin = new Admin(obj);
    newAdmin.save();
    let token = jwt.sign(
      {
        username: req.body.username,
        role: "admin",
      },
      SECRET,
      { expiresIn: "24h" }
    );
    res.status(200).json({ message: "Admin created successfully", token });
  } else {
    res.status(401).send({ message: "Admin already registered" });
  }
}
