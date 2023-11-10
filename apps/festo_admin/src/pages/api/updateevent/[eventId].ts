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
  const { eventId } = req.query;
  console.log(eventId);
  console.log(req.body);
  const newCourse = await Event.findByIdAndUpdate(eventId, req.body);

  console.log(newCourse);
  if (newCourse) {
    res.status(201).json(newCourse);
  } else {
    res.status(404).send("No course found with the provided ID");
  }
}
