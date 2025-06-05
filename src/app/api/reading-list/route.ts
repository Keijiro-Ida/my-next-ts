import { PrismaClient } from "@/generated/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createBook } from "@/lib/actions";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { book, userId } = await req.json();

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
          userId: userId,
          bookId: book.id
        }
      },
      update: {},
      create: {
        userId: userId,
        bookId: book.id,
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("API error:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {

  const { bookId, userId } = await req.json();

  await prisma.readingList.delete({
    where: {
      userId_bookId: {
        userId: userId,
        bookId: bookId,
      }
    }
  });

  return NextResponse.json({ ok: true });
}
