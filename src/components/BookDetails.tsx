"use client";
import Image from 'next/image';
import { useState } from "react";

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
  isInReadingList?: boolean;
};

export default function BookDetails({ index, book, email, isInReadingList }: Props) {
  const [inList, setInList] = useState(isInReadingList);

  const handleAddOrRemoveReadingList = async () => {

    if (inList) {
      const res = await fetch('/api/reading-list', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id, email }),
      });

      if (res.ok) setInList(false);

    } else {
      const res = await fetch('/api/reading-list', {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ book: book, email }),
      });

     if (res.ok) {
      setInList(true);
    }
  };
  }
  return (
    <div className="flex w-full mb-4">
      <div>
        <Image
          src={book.image ? book.image : '/vercel.svg'}
          alt=""
          width={140}
          height={180}
        />
      </div>
      <div>
        <ul className="list-none text-black ml-4">
          <li>{index !== undefined && `${index}.`}</li>
          <li>{book.title} ({book.price}円)</li>
          <li>著者: {book.author}</li>
          <li>出版社: {book.publisher}</li>
          <li>出版日: {book.published}</li>
        </ul>
        {email && (
          <button
            type="button"
            onClick={handleAddOrRemoveReadingList}
            className={
              inList
                ? "bg-gray-400 text-white rounded px-4 py-2 mr-2 hover:bg-red-500"
                : "bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500"
            }
          >
            {inList ? "リストから削除" : "ほしい本リスト"}
          </button>
        )}
      </div>
    </div>
  );
}
