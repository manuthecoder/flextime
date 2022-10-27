import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //  Create a new appointment
  const result = await prisma.appointment.delete({
    where: {
      id: parseInt(req.query.id.toString()),
    },
  });
  res.json({});
}
