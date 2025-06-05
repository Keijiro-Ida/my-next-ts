import { getReviewsByEmail } from "@/lib/getter";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import { Review, Book, User, Like } from "@/generated/prisma/client";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const dynamic = "force-dynamic";

export default async function Home() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const userId = session.user?.id;

  const reviews = await getReviewsByEmail(session.user?.email || "") as (Review & { book: Book, user: User, likes: Like[] })[];


  if (!reviews || reviews.length === 0) {

    return <div>レビューがありません。</div>;
  }

  return (
      <>
      {reviews.map((review, i) => (
        <LinkedBookDetails book={review.book} index={i + 1} key={review.id} review={review} userId={userId}/>
      ))}
    </>
  );
}
