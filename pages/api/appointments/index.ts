import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Select from appointments where studentId is the studentId
  const result = await prisma.user.findMany({
    where: {
      studentId: req.query.studentId.toString(),
    },
    select: {
      appointments: {
        include: {
          flexChoice: true,
        },
      },
    },
  });
  res.json(result);
}
