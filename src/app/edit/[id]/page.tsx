import BookDetails from '@/components/BookDetails';
import FormEdit from '@/components/FormEdit';
import { getBookById, getReviewById } from '@/lib/getter';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


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
  console.log(session.user);
  const email = session.user?.email;

    const book = await getBookById(params.id);
    const review = await getReviewById(params.id, email);
    const read = (review?.read || new Date()).toLocaleDateString('sv-SE');

    return (
        <div id="form">
            <BookDetails book={book} />
            <hr />
            <FormEdit src={{id: book.id, read, memo:review?.memo ?? "",email: session.user?.email ?? ""}} />
        </div>
    )
}
