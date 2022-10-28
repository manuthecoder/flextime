import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //  Set the studentId of the user to the studentId in the request body
  const { id, studentId } = req.body;
  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      studentId: studentId.toString(),
    },
  });

  res.json(result);
}
