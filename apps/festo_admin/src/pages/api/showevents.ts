import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const events = await Event.find({});
  console.log("tarun", events);
  res.status(201).json(events);
}
