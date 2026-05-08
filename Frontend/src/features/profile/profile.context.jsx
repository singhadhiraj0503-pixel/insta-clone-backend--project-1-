import { createContext, useState } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setprofile] = useState(null);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setprofile,
        followers,
        setfollowers,
        following,
        setfollowing,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
