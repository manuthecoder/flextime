import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// GET /api/checkIfAdmin
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV === "development") {
    res.json({ admin: true });
    return;
  }
  //   Select from staff where name contains the search term
  const result = await prisma.flexChoice.findFirst({
    where: {
      email: req.query.email.toString(),
    },
  });

  res.json({
    admin: result ? true : false,
  });
}
