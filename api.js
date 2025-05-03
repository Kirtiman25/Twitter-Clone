import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await api.post('/auth/login', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User API calls
export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await api.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const followUser = async (userId) => {
  try {
    const response = await api.put(`/users/follow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unfollowUser = async (userId) => {
  try {
    const response = await api.put(`/users/unfollow/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Tweet API calls
export const createTweet = async (tweetData) => {
  try {
    const response = await api.post('/tweets', tweetData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTweets = async () => {
  try {
    const response = await api.get('/tweets');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTimeline = async () => {
  try {
    const response = await api.get('/tweets/timeline');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getUserTweets = async (userId) => {
  try {
    const response = await api.get(`/tweets/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getTweetById = async (tweetId) => {
  try {
    const response = await api.get(`/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteTweet = async (tweetId) => {
  try {
    const response = await api.delete(`/tweets/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const likeTweet = async (tweetId) => {
  try {
    const response = await api.put(`/tweets/like/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unlikeTweet = async (tweetId) => {
  try {
    const response = await api.put(`/tweets/unlike/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const retweetTweet = async (tweetId) => {
  try {
    const response = await api.put(`/tweets/retweet/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const unretweetTweet = async (tweetId) => {
  try {
    const response = await api.put(`/tweets/unretweet/${tweetId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const commentOnTweet = async (tweetId, commentData) => {
  try {
    const response = await api.post(`/tweets/comment/${tweetId}`, commentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteComment = async (tweetId, commentId) => {
  try {
    const response = await api.delete(`/tweets/comment/${tweetId}/${commentId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default api;
