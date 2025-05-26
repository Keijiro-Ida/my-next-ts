import { getAllReviews } from "@/lib/getter";
import LinkedBookDetails from "@/components/LinkedBookDetails";
import { Review } from "../generated/prisma/client"; // 追加

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews: Review[] | null = await getAllReviews();

  if (!reviews) {
    return <div>レビューがありません。</div>;
  }

  return (
      <>
      {reviews.map((b, i) => (
        <LinkedBookDetails book={b} index={i + 1} key={b.id} />
      ))}
    </>
  );
}
