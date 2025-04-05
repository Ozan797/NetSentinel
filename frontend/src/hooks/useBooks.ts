import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBooks = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:4000/api/books')
      .then(response => {
        setBooks(response.data);
      })
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
};
