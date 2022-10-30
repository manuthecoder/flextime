import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //  Create a new appointment
  const { studentId, teacherCreated, flexId, date, reason }: any = req.body;
  // Upsert an apppointment based on identifier
  const identifier = `${studentId},${date}`;

  const appointment = await prisma.appointment.upsert({
    where: {
      identifier: identifier,
    },
    update: {
      identifier: identifier,

      flexChoice: {
        connect: {
          email: flexId,
        },
      },
      teacherCreated: teacherCreated === "true",
      reason: reason,
      student: {
        connect: {
          studentId: studentId,
        },
      },
      date: date,
      attended: false,
    },
    create: {
      identifier: identifier,
      flexChoice: {
        connect: {
          email: flexId,
        },
      },
      teacherCreated: teacherCreated === "true",
      reason: reason,
      student: {
        connect: {
          studentId: studentId,
        },
      },
      date: date,
      attended: false,
    },
  });

  res.json({});
}
