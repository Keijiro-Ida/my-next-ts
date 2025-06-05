"use client";
import Image from 'next/image';
import { useState, useEffect } from "react";
import type { Book, Review, User, Like } from "@/generated/prisma/client";


type Props = {
  index?: number;
  book: Book;
  email?: string;
  isInReadingList?: boolean;
  review?: Review & { book: Book; user?: User, likes?: Like[] };
  userId?: string;
};

export default function BookDetails({ index, book,isInReadingList, review, userId }: Props) {
  const [inList, setInList] = useState(isInReadingList);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(review?.likes?.length || 0);

  useEffect(() => {
  if (review?.likes && userId) {
      setLiked(review.likes.some(like => like.userId === userId));
    }
  }, [review, userId]);


  const handleLike = async () => {

    if (!userId || !review) return;
    if (liked) {
      // いいね解除
      const res = await fetch('/api/like', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id, userId }),
      });
      if (res.ok) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    } else {
      // いいね
      const res = await fetch('/api/like', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewId: review.id, userId }),
      });
      if (res.ok) {
        setLiked(true);
        setLikeCount(likeCount + 1);
      }
    }
  };
  const handleAddOrRemoveReadingList = async () => {

    if (inList) {
      const res = await fetch('/api/reading-list', {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: book.id, userId }),
      });

      if (res.ok) setInList(false);

    } else {
      const res = await fetch('/api/reading-list', {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({ book: book, userId }),
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
            <button
              type="button"
              onClick={ e => {
              e.preventDefault();
              handleLike()}
              }
              className="flex items-center mt-1 focus:outline-none"
            >
              <span className={liked ? "text-pink-500 text-xl mr-1" : "text-gray-500 text-xl mr-1"}>♥</span>
              <span className="text-gray-700">{likeCount}</span>
            </button>
          </div>
        )}
        {userId && (
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
