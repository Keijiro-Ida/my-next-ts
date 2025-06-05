import { PrismaClient } from '../generated/prisma/client';
import { Review, ReadingList } from '../generated/prisma/client';

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

export async function getReviewById(id: string,userId: string): Promise<Review | null> {

  return await prisma.review.findUnique({
     where: {
      userId_bookId: {
        userId: userId,
        bookId: id,
      }
    }
  });
}

export async function getAllReviews(): Promise<Review[] | null> {
  return await prisma.review.findMany({
    orderBy: {
      read: 'desc'
    },
    include: {
      book: true,
      user: true,
      likes: true
    }
  });
}

export async function getReviewsByEmail(email: string): Promise<Review[] | null> {

  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (!user || !user.id) {
    return null;
  }

  const userId = user.id;

  return await prisma.review.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      read: 'desc'
    },
    include: {
      book: true,
      user: true,
      likes: true
    }
  });
}

export async function getIsInReadingList(id: string, userId: string): Promise<boolean> {

  const readingList = await prisma.readingList.findUnique({
    where: {
      userId_bookId: {
        userId: userId,
        bookId: id
      }
    }
  });
  return !!readingList;
}


export async function getReadingListByEmail(email: string): Promise<ReadingList[] | null> {

  if (!email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  if (!user || !user.id) {
    return null;
  }

  const userId = user.id;

  return await prisma.readingList.findMany({
    where: {
      userId: userId
    },
    include: {
      book: true
    }
  });
}
