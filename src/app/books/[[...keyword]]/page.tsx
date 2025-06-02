import LinkedBookDetails from '@/components/LinkedBookDetails';
import { getBooksByKeyword } from '@/lib/getter';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


type Props = {
  params: {
    keyword?: string;
  };
};

export default async function BookResult({ params: { keyword = 'React'} }: Props) {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const books = await getBooksByKeyword(keyword);

  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} email={session.email} />
      ))}
    </>
  );
}
