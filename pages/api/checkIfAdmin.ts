import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// POST /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   Select from staff where name contains the search term
  const result = await prisma.flexChoice.findFirst({
    where: {
      email: req.query.email.toString(),
    },
  });

  res.json(result ? true : false);
}
