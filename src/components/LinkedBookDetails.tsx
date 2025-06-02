"use client";
import Link from 'next/link';
import BookDetails from './BookDetails';

type Book = {
  id: string;
  image: string | null;
  title: string;
  price: number;
  author: string;
  publisher: string;
  published: string;
};

type Props = {
  index?: number;
  book: Book;
  email?: string;
};

export default function LinkedBookDetails({ index, book, email }: Props) {
  return (
    <Link href={`/edit/${book.id}`}>
      <div className="hover:bg-green-50">
        <BookDetails index={index} book={book} email={email}/>
      </div>
    </Link>
  );
}
