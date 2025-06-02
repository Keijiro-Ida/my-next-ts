"use client";
import Link from 'next/link';
import BookDetails from './BookDetails';
import type { Review, Book, User } from "@/generated/prisma/client";


type Props = {
  index?: number;
  book: Book;
  email?: string;
  review: Review & { book: Book; user?: { name?: string } };
};

export default function LinkedBookDetails({ index, book, email, review }: Props) {
  return (
    <Link href={`/edit/${book.id}`}>
      <div className="hover:bg-green-50">
        <BookDetails index={index} book={book} email={email} review={review}/>
      </div>
    </Link>
  );
}
