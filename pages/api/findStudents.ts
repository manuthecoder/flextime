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
  const result = await prisma.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: (req.query.query || "").toString(),
          },
        },
        {
          studentId: {
            contains: (req.query.query || "").toString(),
          },
        },
      ],
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
