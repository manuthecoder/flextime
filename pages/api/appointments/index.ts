import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.admin === "true") {
    const result = await prisma.flexChoice.findMany({
      where: {
        email: req.query.teacherEmail.toString(),
      },
      select: {
        appointments: {
          where: {
            date: req.query.day.toString(),
          },
          include: {
            student: true,
          },
        },
      },
    });
    res.json(result[0] || { error: true });
  } else {
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
    res.json(
      result[0] ? (result[0].appointments ? result[0].appointments : []) : []
    );
  }
}
