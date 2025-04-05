// src/pages/BookshelfPage.tsx
import React, { useState, useEffect } from 'react';
import { fetchUserBooks, createUserBook } from '../api/userBook';

const BookshelfPage: React.FC = () => {
  const [bookshelf, setBookshelf] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchUserBooks(token)
        .then(data => {
          setBookshelf(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Failed to load bookshelf');
          setLoading(false);
        });
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [token]);

  const handleAddBook = async () => {
    // For simplicity, we're adding a dummy book.
    // In a real application, you'll collect book details from a form.
    const newBook = {
      bookId: 'dummy-book-id', // This should be a valid book ID from your Book table.
      status: 'to-read',
      rating: null,
      startedAt: null,
      finishedAt: null,
    };
    if (token) {
      try {
        const addedBook = await createUserBook(newBook, token);
        setBookshelf(prev => [...prev, addedBook]);
      } catch (err) {
        console.error(err);
        setError('Failed to add book');
      }
    }
  };

  if (loading) return <div>Loading your bookshelf...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Your Bookshelf</h1>
      {bookshelf.length === 0 ? (
        <p>No books found in your bookshelf. Add some!</p>
      ) : (
        <ul>
          {bookshelf.map((item: any) => (
            <li key={item.id}>
              <strong>{item.book.title}</strong> - {item.status}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleAddBook}>Add Dummy Book</button>
    </div>
  );
};

export default BookshelfPage;
