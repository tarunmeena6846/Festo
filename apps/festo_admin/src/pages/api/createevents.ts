// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";

type Data = {
  message?: string;
  eventId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body);
  await ensureDbConnected();
  const newEvent = new Event(req.body);
  newEvent.save();
  console.log("tarun", newEvent);
  res
    .status(201)
    .send({ message: "Event created successfully", eventId: newEvent.id });
}
