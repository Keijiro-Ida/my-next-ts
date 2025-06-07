"use client";
import Link from 'next/link';
import BookDetails from './BookDetails';
import type { Review, Book, User, Like } from "@/generated/prisma/client";


type Props = {
  index?: number;
  book: Book;
  email?: string;
  review?: Review & { book: Book; user?: User, likes?: Like[]};
  userId?: string;
  isInReadingList?: boolean;
  showReadingListButton?: boolean;
};

export default function LinkedBookDetails({ index, book, email, review, userId, showReadingListButton=false}: Props) {
  return (
    <Link href={`/edit/${book.id}`}>
      <div className="hover:bg-green-50">
        <BookDetails index={index} book={book} email={email} review={review} userId={userId} showReadingListButton={showReadingListButton}/>
      </div>
    </Link>
  );
}
