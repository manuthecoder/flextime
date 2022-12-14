import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Select from flexChoice settings where id is id and date is date from req query
  const result = await prisma.flexChoice.findUnique({
    where: {
      id: parseInt(req.query.id.toString()),
    },
    select: {
      appointments: {
        select: {
          id: true,
        },
        where: {
          date: req.query.date.toString(),
        },
      },
      settings: {
        where: {
          date: req.query.date.toString(),
        },
      },
    },
  });
  res.json({
    settings: result
      ? result.settings
        ? result.settings[0]
          ? result.settings[0]
          : {}
        : {}
      : {},
    appointments: result ? result.appointments : [],
  });
}
