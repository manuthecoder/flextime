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
      flexChoice: {
        connect: {
          id: flexId,
        },
      },
      teacherCreated: teacherCreated === "true",
      reason: reason,
      student: {
        connect: {
          id: studentId,
        },
      },
      date: date,
      attended: false,
    },
    create: {
      flexChoice: {
        connect: {
          id: flexId,
        },
      },
      teacherCreated: teacherCreated === "true",
      reason: reason,
      student: {
        connect: {
          id: studentId,
        },
      },
      date: date,
      attended: false,
    },
  });

  res.json({});
}
