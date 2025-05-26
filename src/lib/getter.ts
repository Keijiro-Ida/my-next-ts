import { PrismaClient } from '../generated/prisma/client';
import { Review } from '../generated/prisma/client';

const prisma = new PrismaClient();

type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publisher: string;
    publishedDate: string;
    imageLinks?: {
      smallThumbnail: string;
    };
  };
  saleInfo: {
    listPrice?: {
      amount: number;
    };
  };
};

export function createBook(book: GoogleBook) {
  const authors = book.volumeInfo.authors;
  const price = book.saleInfo.listPrice;
  const img = book.volumeInfo.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: authors ? authors.join(',') : '',
    price: price ? price.amount : 0,
    publisher: book.volumeInfo.publisher,
    published: book.volumeInfo.publishedDate,
    image: img ? img.smallThumbnail : '/vercel.svg',
  };
}

export async function getBooksByKeyword(keyword: string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&langRestrict=ja&maxResults=20&printType=books`);
  const result = await res.json();
  const books = [];
  for (const b of result.items) {
    books.push(createBook(b));
  }
  return books;
}

export async function getBookById(id: string) {
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id: string): Promise<Review | null> {
  return await prisma.review.findUnique({
    where: {
      id: id
    }
  });
}

export async function getAllReviews(): Promise<Review[] | null> {
  return await prisma.review.findMany({
    orderBy: {
      read: 'desc'
    }
  });
}
