import LinkedBookDetails from '@/components/LinkedBookDetails';
import { getBooksByKeyword } from '@/lib/getter';

type Props = {
  params: {
    keyword?: string;
  };
};

export default async function BookResult({ params: { keyword = 'React'} }: Props) {

  const books = await getBooksByKeyword(keyword);
  console.log(books);
  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
      ))}
    </>
  );
}
