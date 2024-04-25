import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { conversationId } = req.query;

  if (!conversationId) {
    throw new Error("Invalid conversation id");
  }

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId as string,
      },
      include: {
        users: true
      }
    });

    return res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    return [];
  }
}
