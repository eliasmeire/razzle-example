import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
});

export const fetchPosts = async () => {
  return api.get('/posts?userId=1').then(response => response.data);
};

export const fetchPost = async postId => {
  return api.get(`/posts/${postId}`).then(response => response.data);
};
