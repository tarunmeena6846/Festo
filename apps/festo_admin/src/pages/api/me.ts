import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";
import isUserAdmin from "@/lib/authAdmin";
type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const isAdmin = isUserAdmin(req);
  console.log("tarun is admin", isAdmin);

  if (isAdmin) {
    res.status(200).send(isAdmin);
  } else {
    res.status(401).send("Unauthorised");
  }
}
