import { getReadingListByEmail } from "@/lib/getter";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import type { ReadingList, Book } from "@/generated/prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function ReadingList() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const readingLists = await getReadingListByEmail(session.user?.email || "") as (ReadingList & { book: Book })[];


  if (!readingLists || readingLists.length === 0) {

    return <div>欲しい本がありません。</div>;
  }

  return (
      <>
      {readingLists.map((readingList, i) => (
        <LinkedBookDetails book={readingList.book} index={i + 1} key={readingList.id} />
      ))}
    </>
  );
}
