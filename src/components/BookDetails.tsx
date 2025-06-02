"use client";
import Image from 'next/image';
import { useState } from "react";
import type { Book, Review } from "@/generated/prisma/client";


type Props = {
  index?: number;
  book: Book;
  email?: string;
  isInReadingList?: boolean;
  review?: Review & { book: Book; user?: { name?: string } }
};

export default function BookDetails({ index, book, email, isInReadingList, review }: Props) {
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
        {review && review.user?.name && (
          <div className="text-sm text-gray-500">
            by {review.user.name}
          </div>
        )}
        {review && (
          <div className="mt-2">
            {/* レーティング（星） */}
            {typeof review.rating === "number" && (
              <div>
                評価:{" "}
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
            )}
            {/* レビュー（20字まで） */}
            {review.memo && (
              <div className="text-gray-700 mt-1">
                感想: {review.memo.slice(0, 20)}
                {review.memo.length > 20 && "…"}
              </div>
            )}
          </div>
        )}
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
