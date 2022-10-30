import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(req: any, res: NextApiResponse) {
  // Create/update flexsetting if exists for certain date and flexChoice
  const { accessToken, flexChoice, date, key, value } = req.query;
  const result: any = await prisma.flexSetting.upsert({
    where: {
      accessToken: accessToken.toString(),
    },
    update: {
      accessToken: accessToken,
      date: date,
      [key]: req.query.value,
      flexChoice: {
        connect: {
          id: parseInt(flexChoice, 10),
        },
      },
    },
    create: {
      accessToken: accessToken,
      date: date,
      [key]: value,
      flexChoice: {
        connect: {
          id: parseInt(flexChoice, 10),
        },
      },
    },
  });

  res.json(result);
}
