import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //  Create a new appointment
  const { studentId, teacherCreated, flexId, date, reason }: any = req.body;
  const result = await prisma.appointment.create({
    data: {
      reason: reason ?? "",
      teacherCreated: teacherCreated === "true",
      student: {
        connect: {
          studentId,
        },
      },
      date: req.body.date,
      flexChoice: {
        connect: {
          id: parseInt(flexId.toString()),
        },
      },
    },
  });

  res.json({});
}
