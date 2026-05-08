import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/users",
  withCredentials: true,
});

export const getProfile = async (username) => {
  const response = await api.get(`/profile/${username}`);
  return response.data;
};

export const getFollowers = async (username) => {
  const response = await api.get(`/followers/${username}`);
  return response.data;
};

export const getFollowing = async (username) => {
  const response = await api.get(`/following/${username}`);
  return response.data;
};
