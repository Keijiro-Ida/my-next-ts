import BookDetails from '@/components/BookDetails';
import FormEdit from '@/components/FormEdit';
import { getBookById, getReviewById } from '@/lib/getter';

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPage({ params }: Props) {
    const book = await getBookById(params.id);
    const review = await getReviewById(params.id);
    const read = (review?.read || new Date()).toLocaleDateString('sv-SE');

    return (
        <div id="form">
            <BookDetails book={book} />
            <hr />
            <FormEdit src={{id: book.id, read, memo:review?.memo}} />
        </div>
    )
}
