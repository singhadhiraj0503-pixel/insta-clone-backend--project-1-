import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setuser, loading, setloading } = context;

  const handleLogin = async (username, password) => {
    setloading(true);
    try {
      const response = await login(username, password);
      console.log(response.user);
    } catch (error) {
      throw new Error("Error");
    } finally {
      setloading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setloading(true);
    try {
      const response = await register(username, email, password);
      console.log(response.user);
    } catch (error) {
      throw new Error("Error");
    } finally {
      setloading(false);
    }
  };

  return { user, loading, handleLogin, handleRegister };
};
