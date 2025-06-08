'use server';

import { redirect } from 'next/navigation';
import { PrismaClient } from '../generated/prisma/client';
import { getBookById } from './getter';

const prisma = new PrismaClient();

export async function addReview(data: FormData) {

    const userId = data.get('userId') as string;

    const bookId = data.get('id') as string;
    console.log('Adding review for bookId:', bookId);
    // 既に本が存在するかチェック
    const exists = await prisma.book.findUnique({ where: { id: bookId } });

    // なければGoogle Books APIから取得して作成
    if (!exists) {
      const book = await getBookById(bookId);
      await createBook({
        id: book.id,
        title: book.title,
        author: book.author,
        image: book.image ?? null,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
      });
    }

    const input = {
        bookId: bookId,
        read: new Date(data.get('read') as string),
        memo: data.get('memo') as string,
        rating: data.get('rating') ? Number(data.get('rating')) : null,
        userId: userId || '',
    };

    await prisma.review.upsert({
        update: input,
        create: { ...input },
        where: {
            userId_bookId: {
            userId: userId,
            bookId: bookId
            }
        }
    });

    redirect('/');
}

export async function removeReview(id: string, userId: string) {

    await prisma.review.delete({
        where: {
            userId_bookId: {
                userId: userId,
                bookId: id
            }
        }
    });
    redirect('/');
}

export async function createBook(book: {
  id: string;
  title: string;
  author: string;
  image: string | null;
  price: number;
  publisher: string;
  published: string;
}) {
  await prisma.book.upsert({
    where: { id: book.id },
    update: {
      title: book.title,
      author: book.author,
      image: book.image,
      price: book.price,
      publisher: book.publisher,
      published: book.published,
    },
    create: {
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      price: book.price,
      publisher: book.publisher,
      published: book.published,
    },
  });
}
