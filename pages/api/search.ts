import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   Select from staff where name contains the search term
  const result = await prisma.flexChoice.findMany({
    where: {
      name: {
        contains: req.query.name.toString() ?? "",
      },
    },
    include: {
      appointments: {
        select: {
          id: true,
        },
      },
    },
  });

  res.json(result);
}
