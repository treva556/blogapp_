

// app/api/comments.js
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getSession({ req: request });

  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const { postId, content } = await request.json();

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
    },
  });

  return new Response(JSON.stringify(comment), { status: 201 });
}