
// pages/api/comments.js
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const { postId, content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: session.user.id,
      },
    });

    res.status(201).json(comment);
  }
}