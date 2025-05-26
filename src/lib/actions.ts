'use server';

import { redirect } from 'next/navigation';
import { PrismaClient } from '../generated/prisma/client';
import { getBookById } from './getter';

const prisma = new PrismaClient();

export async function addReview(data: FormData) {
    const book = await getBookById(data.get('id') as string);

    const input = {
        title: book.title,
        author: book.author,
        price: Number(book.price),
        publisher: book.publisher,
        published: book.published,
        image: book.image,
        read: new Date(data.get('read') as string),
        memo: data.get('memo') as string,
    };

    await prisma.review.upsert({
        update: input,
        create: { ...input, id: data.get('id') as string },
        where: {
            id: data.get('id') as string
        }
    });

    redirect('/');
}

export async function removeReview(id: string) {
    await prisma.review.delete({
        where: {
            id: id
        }
    });
    redirect('/');
}
