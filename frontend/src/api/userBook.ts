import axios from 'axios';

const API_URL = 'http://localhost:4000/api/userbooks';

export const fetchUserBooks = async (token: string) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createUserBook = async (data: any, token: string) => {
  const response = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
