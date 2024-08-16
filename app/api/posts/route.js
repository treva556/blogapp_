

// app/api/posts/routes
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function POST(request) {
  const session = await getSession({ req: request });

  if (!session) {
    return new Response(JSON.stringify({ message: "Not authenticated" }), { status: 401 });
  }

  const { content } = await request.json();

  const post = await prisma.post.create({
    data: {
      content,
      authorId: session.user.id,
    },
  });

  return new Response(JSON.stringify(post), { status: 201 });
}

export async function GET() {
  const posts = await prisma.post.findMany({
    include: { author: true, comments: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(posts), { status: 200 });
}
