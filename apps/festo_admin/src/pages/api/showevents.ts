import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const { category } = req.query;
  let events;
  console.log("tarun at showevent category is ", category);
  if (category && category !== "All") {
    // Fetch events based on the category
    events = await Event.find({ category });
  } else {
    events = await Event.find({});
  }
  console.log("tarun at filter events", events);
  res.status(201).json(events);
}
