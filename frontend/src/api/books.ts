import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const fetchBooks = () => {
  return axios.get(`${API_URL}/books`).then(response => response.data);
};

export const createBook = (bookData: any) => {
  return axios.post(`${API_URL}/books`, bookData).then(response => response.data);
};
