// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Event } from "db";
import { ensureDbConnected } from "@/lib/dbconnect";
type Data = {
  name: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  //   const router = useRouter();
  const { eventId } = req.query;
  const event = await Event.findById(eventId);
  console.log(event);
  if (event) {
    res.status(201).json(event);
  } else {
    return res.status(400).send({ message: "Course not found" });
  }
}
