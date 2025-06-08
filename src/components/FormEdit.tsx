"use client";
import React from 'react';
import { addReview, removeReview } from '@/lib/actions';
import { useTransition } from 'react';

type Props = {
  src: {
    id: string;
    read: string;
    memo: string;
    email: string;
    rating: number | null;
    userId: string;
  };
};

export default function FormEdit({ src: { id, read, memo, email, rating, userId } }: Props) {
  const [, startTransition] = useTransition();

  return (
    <form action={addReview}>
      <input type="hidden" name="id" defaultValue={id} />
      <div className="mb-3">
        <input type="hidden" name="userId" defaultValue={userId} />
        <label className="font-bold" htmlFor="read">読了日：</label>
        <input
          type="date"
          id="read"
          name="read"
          className="block bg-gray-100 border-2 border-gray-600 rounded focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={read}
        />
      </div>
      <div className="mb-3">
        <label className="font-bold block mb-1">評価：</label>
        <div className="flex flex-row-reverse justify-end">
          {[5, 4, 3, 2, 1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                id={`star${star}`}
                name="rating"
                value={star}
                className="hidden peer"
                defaultChecked={Number(rating) === star}
              />
              <label
                htmlFor={`star${star}`}
                className="cursor-pointer text-2xl text-gray-300 peer-checked:text-yellow-400"
              >
                ★
              </label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mb-3">
        <label className="font-bold" htmlFor="memo">感想：</label>
        <textarea
          id="memo"
          name="memo"
          rows={3}
          className="block bg-gray-100 border-2 border-gray-600 w-full rounded focus:bg-white focus:outline-none focus:border-red-500"
          defaultValue={memo}
        ></textarea>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500"
      >
        登録
      </button>
      <button
        type="button"
        className="bg-red-600 text-white rounded px-4 py-2 hover:bg-red-500"
        onClick={() => {
          startTransition(() => removeReview(id, email));
        }}
      >
        削除
      </button>
    </form>
  );
}
