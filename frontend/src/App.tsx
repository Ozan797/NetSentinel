import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookshelfPage from './pages/BookshelfPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/bookshelf">Bookshelf</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookshelf" element={<BookshelfPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
