import { createBook } from './getter';

describe('createBook', () => {
  it('should create a book object from GoogleBook', () => {
    const googleBook = {
      id: 'abc123',
      volumeInfo: {
        title: 'テストタイトル',
        authors: ['著者A', '著者B'],
        publisher: '出版社',
        publishedDate: '2020-01-01',
        imageLinks: { smallThumbnail: 'http://example.com/image.jpg' }
      },
      saleInfo: {
        listPrice: { amount: 1500 }
      }
    };

    const result = createBook(googleBook);

    expect(result).toEqual({
      id: 'abc123',
      title: 'テストタイトル',
      author: '著者A,著者B',
      price: 1500,
      publisher: '出版社',
      published: '2020-01-01',
      image: 'http://example.com/image.jpg'
    });
  });
});
