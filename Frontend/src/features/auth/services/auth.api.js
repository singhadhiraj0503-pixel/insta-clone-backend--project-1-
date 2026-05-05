import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const register = async (username, email, password) => {
  try {
    const { data } = await api.post("/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await api.post("/login", {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const getMe = async () => {
  try {
    const { data } = await axios.get("/get-me");
    return data;
  } catch (error) {
    throw new Error("Error");
  }
};
