import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(false);

  // const handleLogin = async (username, password) => {
  //   setloading(true);
  //   try {
  //     const response = await login(username, password);
  //     setuser(response.user);
  //   } catch (error) {
  //     throw new Error("Error");
  //   } finally {
  //     setloading(false);
  //   }
  // };

  // const handleRegister = async (username, email, password) => {
  //   setloading(true);
  //   try {
  //     const response = await register(username, email, password);
  //     setuser(response.user);
  //   } catch (error) {
  //     throw new Error("Error");
  //   } finally {
  //     setloading(false);
  //   }
  // };

  // return (
  //   <AuthContext.Provider
  //     value={{ user, loading, handleLogin, handleRegister }}
  //   >
  //     {children}
  //   </AuthContext.Provider>
  // );

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};
