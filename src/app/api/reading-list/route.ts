import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createBook } from "@/lib/actions";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { book, email } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true }
    });
    console.log("addReadingList called with book:", book, "and email:", email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await createBook({
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.image ?? null,
      price: Number(book.price),
      publisher: book.publisher,
      published: book.published,
    });

    await prisma.readingList.upsert({
      where: {
        userId_bookId: {
          userId: user.id,
          bookId: book.id
        }
      },
      update: {},
      create: {
        userId: user.id,
        bookId: book.id,
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
