
// pages/api/posts.js
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (req.method === "POST") {
    const { content } = req.body;

    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const post = await prisma.post.create({
      data: {
        content,
        authorId: session.user.id,
      },
    });

    res.status(201).json(post);
  } else if (req.method === "GET") {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(posts);
  }
}