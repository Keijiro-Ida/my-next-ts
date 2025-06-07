import { getAllReviews } from "@/lib/getter";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import { Review, Book } from "../generated/prisma/client";
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

  const reviews = await getAllReviews() as (Review & { book: Book })[];

  if (!reviews || reviews.length === 0) {

    return <div>レビューがありません。</div>;
  }

  return (
      <>
      {reviews.map((review, i) => (
        <LinkedBookDetails review={review} book={review.book} index={i + 1} key={review.id} userId={userId}
       />
      ))}
    </>
  );
}
