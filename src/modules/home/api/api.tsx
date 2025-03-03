import axios from 'axios';

export const fetchHomeContent = async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts/1',
  );
  return response.data;
};
