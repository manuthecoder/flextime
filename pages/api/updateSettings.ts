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
  const body = req.body;
  console.log(body);
  const accessToken = body.accessToken;
  const data = body.data;

  const allowedParameters = ["studentId", "iCal", "darkMode"];
  const updated = {};
  allowedParameters.forEach((parameter) => {
    if (data[parameter] && parameter !== "darkMode") {
      updated[parameter] = data[parameter];
    }
    if (data[parameter] && parameter === "darkMode") {
      updated[parameter] = data[parameter] === "true" ? true : false;
    }
  });

  const result = await prisma.user.update({
    where: {
      accessToken: accessToken,
    },
    data: updated,
  });

  res.json(result);
}
