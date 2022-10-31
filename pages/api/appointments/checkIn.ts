import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(req: any, res: NextApiResponse) {
  // Create/update flexsetting if exists for certain date and flexChoice
  const { studentId, day, flexId } = req.query;
  const identifier = `${studentId},${day}`;

  //   Select from appointments where identifier is the identifier
  const result = await prisma.appointment.findUnique({
    where: {
      identifier: identifier.toString(),
    },
    include: {
      flexChoice: true,
    },
  });

  if (!result) {
    res.json({ error: "Incorrect student ID" });
    return;
  }

  if (result.flexChoice.id !== parseInt(flexId)) {
    res.json({
      error: "Flex appointment scheduled with " + result.flexChoice.name,
    });
    return;
  }

  const updated = await prisma.appointment.update({
    where: {
      identifier: identifier.toString(),
    },
    include: { student: true },
    data: {
      attended: true,
    },
  });

  res.json(updated);
}
