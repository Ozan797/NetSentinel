import React from 'react';
import { useBooks } from '../hooks/useBooks';

const BookshelfPage: React.FC = () => {
  const { books, loading, error } = useBooks();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading books.</p>;

  return (
    <div>
      <h1>Your Bookshelf</h1>
      {books.length === 0 ? (
        <p>No books found. Add one!</p>
      ) : (
        <ul>
          {books.map((book: any) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookshelfPage;
