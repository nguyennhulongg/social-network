import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { conversationId } = req.query;

    if (!conversationId) {
      throw new Error("Invalid conversation id");
    }
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId as string,
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    return [];
  }
}
