import LinkedBookDetails from '@/components/LinkedBookDetails';
import { getBooksByKeyword } from '@/lib/getter';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";


type Props = {
  params: {
    keyword?: string | string[];
  };
};

export default async function BookResult({ params }: Props) {
  let keyword: string = "React";
  if (Array.isArray(params.keyword)) {
    keyword = params.keyword[0] ?? "React";
  } else if (typeof params.keyword === "string") {
    keyword = params.keyword;
  }
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const userId = session.user?.id;
  if (!userId) {
    redirect("/login");
  }
  const books = await getBooksByKeyword(keyword);

  return (
    <>
      {books.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} userId={userId}  showReadingListButton={true} />
      ))}
    </>
  );
}
