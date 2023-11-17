// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";
// type Data = {
//   name: string;
//   message?: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await ensureDbConnected();
  const { eventId } = req.query;
  console.log("tarun eventid at backend rotue ", eventId);
  const course = await Event.findByIdAndDelete(eventId);
  console.log(course);
  if (course) {
    res.status(201).json(course);
  } else {
    return res.status(400).send({ message: "Course not found" });
  }
}
