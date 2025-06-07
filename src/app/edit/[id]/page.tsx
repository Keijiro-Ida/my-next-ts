import BookDetails from '@/components/BookDetails';
import FormEdit from '@/components/FormEdit';
import { getBookById, getReviewById, getIsInReadingList } from '@/lib/getter';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";


type Props = {
  params: {
    id: string;
  };
};

export default async function EditPage({ params }: Props) {

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user?.id;
  if (!userId) {
    redirect("/login");
}

  const book = await getBookById(params.id);
  const review = await getReviewById(params.id, userId);
  const read = (review?.read || new Date()).toLocaleDateString('sv-SE');
  const isInReadingList = await getIsInReadingList(params.id, userId);
  console.log(review?.rating);
  return (
      <div id="form">
          <BookDetails book={book} userId={userId} isInReadingList={isInReadingList}/>
          <hr />
          <FormEdit src={{id: book.id, read, memo:review?.memo ?? "",email: session.user?.email ?? "", rating: review?.rating ?? null }} />
      </div>
  )
}
