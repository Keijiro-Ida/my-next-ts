import Image from 'next/image';

type Book = {
  image: string;
  title: string;
  price: number;
  author: string;
  publisher: string;
  published: string;
};

type Props = {
  index?: number;
  book: Book;
};

export default function BookDetails({ index, book }: Props) {
  return (
    <div className="flex w-full mb-4">
      <div>
        <Image
          src={book.image}
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
      </div>
    </div>
  );
}
